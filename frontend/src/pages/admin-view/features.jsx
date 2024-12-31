import ProductImageUpload from "@/components/admin-view/image-upload";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {  addFeatureImage,
          fetchAllFeatureImages,
          getFeatureImages,
          deleteFeatureImage } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminFeature() {
  (handleDelete)
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  console.log(uploadedImageUrl, "uploadedImageUrl");

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  }

  function handleDelete(getFeatureImageId) {
    dispatch(deleteFeatureImage(getFeatureImageId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllFeatureImages());
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "featureImageList");

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyling={true}
        // isEditMode={currentEditedId !== null}
      />
      <Button onClick={handleUploadFeatureImage} className="w-full mt-5 bg-purple-600 hover:bg-purple-800">
        Upload
      </Button>
      <Card className="w-full max-w-full max-h-full mx-auto mt-5 bg-gray-800 border-gray-700">
      <div>
      <div className="flex flex-col gap-4 mb-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div className="relative">
                <img
                  src={featureImgItem.image}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </div>
            ))
          : null}
      </div>
        <CardFooter className="flex items-center justify-between">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
                <Button className="bg-red-600 hover:bg-red-800" onClick={() => handleDelete(featureImgItem?._id)}>Delete</Button>
            ))
          : null}
          
        </CardFooter>
      </div>
    </Card>
    </div>
  );
}

export default AdminFeature;
