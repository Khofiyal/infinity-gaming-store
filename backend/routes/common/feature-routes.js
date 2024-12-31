const express = require("express");

const {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
} = require("../../controllers/common/feature-controller");

const router = express.Router();

router.post("/add", addFeatureImage);
router.delete("/delete/:id", deleteFeatureImage);
router.get("/get", getFeatureImages);

module.exports = router;
