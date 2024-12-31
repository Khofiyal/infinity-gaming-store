const express = require("express");
const { checkoutSuccess, createCheckoutSession } = require("../../controllers/shop/payment-controller");

const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession);
router.post("/checkout-success", checkoutSuccess);

module.exports = router;
