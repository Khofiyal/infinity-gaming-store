// import ProductImageUpload from "@/components/admin-view/image-upload";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {  addFeatureImage,
//           fetchAllFeatureImages,
//           getFeatureImages,
//           deleteFeatureImage } from "@/store/common-slice";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// function AdminDashboard() {
//   (handleDelete)
//   const [imageFile, setImageFile] = useState(null);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState("");
//   const [imageLoadingState, setImageLoadingState] = useState(false);
//   const dispatch = useDispatch();
//   const { featureImageList } = useSelector((state) => state.commonFeature);

//   console.log(uploadedImageUrl, "uploadedImageUrl");

//   function handleUploadFeatureImage() {
//     dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(getFeatureImages());
//         setImageFile(null);
//         setUploadedImageUrl("");
//       }
//     });
//   }

//   function handleDelete(getFeatureImageId) {
//     dispatch(deleteFeatureImage(getFeatureImageId)).then((data) => {
//       if (data?.payload?.success) {
//         dispatch(fetchAllFeatureImages());
//       }
//     });
//   }

//   useEffect(() => {
//     dispatch(getFeatureImages());
//   }, [dispatch]);

//   console.log(featureImageList, "featureImageList");

//   return (
//     <div>
//       <ProductImageUpload
//         imageFile={imageFile}
//         setImageFile={setImageFile}
//         uploadedImageUrl={uploadedImageUrl}
//         setUploadedImageUrl={setUploadedImageUrl}
//         setImageLoadingState={setImageLoadingState}
//         imageLoadingState={imageLoadingState}
//         isCustomStyling={true}
//         // isEditMode={currentEditedId !== null}
//       />
//       <Button onClick={handleUploadFeatureImage} className="w-full mt-5 bg-purple-600 hover:bg-purple-800">
//         Upload
//       </Button>
//       <Card className="w-full max-w-full max-h-full mx-auto mt-5 bg-gray-800 border-gray-700">
//       <div>
//       <div className="flex flex-col gap-4 mb-5">
//         {featureImageList && featureImageList.length > 0
//           ? featureImageList.map((featureImgItem) => (
//               <div className="relative">
//                 <img
//                   src={featureImgItem.image}
//                   className="object-cover w-full h-full rounded-t-lg"
//                 />
//               </div>
//             ))
//           : null}
//       </div>
//         <CardFooter className="flex items-center justify-between">
//         {featureImageList && featureImageList.length > 0
//           ? featureImageList.map((featureImgItem) => (
//                 <Button className="bg-red-600 hover:bg-red-800" onClick={() => handleDelete(featureImgItem?._id)}>Delete</Button>
//             ))
//           : null}
          
//         </CardFooter>
//       </div>
//     </Card>
//     </div>
//   );
// }

// export default AdminDashboard;
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AnalyticsTab = () => {
	const [analyticsData, setAnalyticsData] = useState({
		users: 0,
		products: 0,
		totalSales: 0,
		totalRevenue: 0,
	});
	const [isLoading, setIsLoading] = useState(true);
	const [dailySalesData, setDailySalesData] = useState([]);

	useEffect(() => {
		const fetchAnalyticsData = async () => {
			try {
				const response = await axios.get("http://localhost:5000/api/analytics");
				setAnalyticsData(response.data.analyticsData);
				setDailySalesData(response.data.dailySalesData);
			} catch (error) {
				console.error("Error fetching analytics data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAnalyticsData();
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
			<div className='grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4'>
				<AnalyticsCard
					title='Total Users'
					value={analyticsData.users.toLocaleString()}
					icon={Users}
					color='from-purple-500 to-teal-700'
				/>
				<AnalyticsCard
					title='Total Products'
					value={analyticsData.products.toLocaleString()}
					icon={Package}
					color='from-purple-500 to-green-700'
				/>
				<AnalyticsCard
					title='Total Sales'
					value={analyticsData.totalSales.toLocaleString()}
					icon={ShoppingCart}
					color='from-purple-500 to-cyan-700'
				/>
				<AnalyticsCard
					title='Total Revenue'
					value={`$${analyticsData.totalRevenue.toLocaleString()}`}
					icon={DollarSign}
					color='from-purple-500 to-lime-700'
				/>
			</div>
			<motion.div
				className='p-6 rounded-lg shadow-lg bg-gray-800/60'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.25 }}
			>
				<ResponsiveContainer width='100%' height={400}>
					<LineChart data={dailySalesData}>
						<CartesianGrid strokeDasharray='3 3' />
						<XAxis dataKey='name' stroke='#D1D5DB' />
						<YAxis yAxisId='left' stroke='#D1D5DB' />
						<YAxis yAxisId='right' orientation='right' stroke='#D1D5DB' />
						<Tooltip />
						<Legend />
						<Line
							yAxisId='left'
							type='monotone'
							dataKey='sales'
							stroke='#10B981'
							activeDot={{ r: 8 }}
							name='Sales'
						/>
						<Line
							yAxisId='right'
							type='monotone'
							dataKey='revenue'
							stroke='#3B82F6'
							activeDot={{ r: 8 }}
							name='Revenue'
						/>
					</LineChart>
				</ResponsiveContainer>
			</motion.div>
		</div>
	);
};

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
	<motion.div
		className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<div className='flex items-center justify-between'>
			<div className='z-10'>
				<p className='mb-1 text-sm font-semibold text-purple-300'>{title}</p>
				<h3 className='text-3xl font-bold text-white'>{value}</h3>
			</div>
		</div>
		<div className='absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-900 opacity-30' />
		<div className='absolute text-purple-800 opacity-50 -bottom-4 -right-4'>
			<Icon className='w-32 h-32' />
		</div>
	</motion.div>
);
function AdminDashboard() {
  return (
    <div>
      <AnalyticsTab />
    </div>
  );
}

export default AdminDashboard;