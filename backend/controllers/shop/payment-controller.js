const Order = require("../../models/Order");
const Product = require("../../models/Product");
const { stripe } = require("../lib/stripe");

const createCheckoutSession = async (req, res) => {
	try {
		const { Products } = req.body;

		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ error: "Invalid or empty products array" });
		}

		let totalAmount = 0;

		const lineItems = products.map((product) => {
			const amount = Math.round(product.price * 100); // stripe wants u to send in the format of cents
			totalAmount += amount * product.quantity;

			return {
				price_data: {
					currency: "usd",
					product_data: {
						name: product.name,
						images: [product.image],
					},
					unit_amount: amount,
				},
				quantity: product.quantity || 1,
			};
		});

		let coupon = null;
		if (couponCode) {
			coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
			if (coupon) {
				totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
			}
		}

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			success_url: `http://localhost:5173/shop/paypal-return?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `http://localhost:5173/shop/paypal-cancel`,
			metadata: {
				userId: req.user._id.toString(),
				products: JSON.stringify(
					products.map((p) => ({
						id: p._id,
						quantity: p.quantity,
						price: p.price,
					}))
				),
			},
		});

		res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
	} catch (error) {
		console.error("Error processing checkout:", error);
		res.status(500).json({ message: "Error processing checkout", error: error.message });
	}
};

const checkoutSuccess = async (req, res) => {
	try {
		const { products } = req.body;
		const { sessionId } = req.body;
		const { name, email, city, postalCode, streetAddress, country, cartProducts } = req.body;


		const session = await stripe.checkout.sessions.retrieve(sessionId);
		const productsIds = cartProducts;
		const uniqueIds = [...new Set(productsIds)];
		const productsInfos = await Product.find({_id:uniqueIds});

		let line_items = [];
		for (const productId of uniqueIds) {
			const productInfo = productsInfos.find(p => p._id.toString() === productId);
			const quantity = productsIds.filter(id => id === productId)?.length || 0;
			if (quantity > 0 && productInfo) {
			line_items.push({
				quantity,
				price_data: {
				currency: 'USD',
				product_data: {name:productInfo.title},
				unit_amount: quantity * productInfo.price * 100,
				},
			});
			}
		}

		if (session.payment_status === "paid") {
			if (session.metadata.couponCode) {
				await Coupon.findOneAndUpdate(
					{
						code: session.metadata.couponCode,
						userId: session.metadata.userId,
					},
					{
						isActive: false,
					}
				);
			}
			async function createTrxId() {
				const trxId = "TRX-" + Math.floor(Math.random() * 1000000000);
				const trxIdExists = await Order.findOne({ trxId });
				if (trxIdExists) {
					return createTrxId();
				}
				return trxId;
			}
			const trxId = await createTrxId();

            const createOrder = async (req, res) => {
                try {
                  const {
                    userId,
                    cartItems,
                    addressInfo,
                    orderStatus,
                    paymentMethod,
                    paymentStatus,
                    totalAmount,
                    orderDate,
                    orderUpdateDate,
                    paymentId,
                    payerId,
                    cartId,
                  } = req.body;

            const newlyCreatedOrder = new Order({
                      userId,
                      cartId,
                      cartItems,
                      addressInfo,
                      orderStatus,
                      paymentMethod,
                      paymentStatus,
                      totalAmount,
                      orderDate,
                      orderUpdateDate,
                      paymentId,
                      payerId,
                    });
            
                    await newlyCreatedOrder.save();
            
                    res.status(200).json({
                      success: true,
                      message: "Order created successfully",
                      order: newlyCreatedOrder,
                    });
                  } catch (error) {
                    console.error("Error creating order:", error);
                    res.status(500).json({ message: "Error creating order", error: error.message });
                  }
                };

			// create new Order
			const products = JSON.parse(session.metadata.products);
			const newOrder = new Order({
				transactionId: trxId,
				userId: session.metadata.userId,
				username: req.user.name,
				emailUser: req.user.email,
				productsList: products.map((product) => ({
					product: product.id,
					productName: product.name,
					quantity: product.quantity,
					price: product.price,
				})),
				lineItems: line_items,
				// city, postalCode, streetAddress, country,
				totalAmount: session.amount_total / 100, // convert from cents to dollars,
				stripeSessionId: sessionId,
			});

			await newOrder.save();

			res.status(200).json({
				success: true,
				message: "Payment successful, order created, and coupon deactivated if used.",
				orderId: newOrder._id,
			});
		}
	} catch (error) {
		console.error("Error processing successful checkout:", error);
		res.status(500).json({ message: "Error processing successful checkout", error: error.message });
	}
};

async function createNewCoupon(userId) {
	await Coupon.findOneAndDelete({ userId });

	const newCoupon = new Coupon({
		code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
		discountPercentage: 10,
		expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
		userId: userId,
	});

	await newCoupon.save();

	return newCoupon;
}

module.exports = {
    checkout,
    createCheckoutSession,
    checkoutSuccess,
    
};
