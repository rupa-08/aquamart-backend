const express = require("express");
const router = express.Router();

const ProductController = require("../app/controllers/product.controller");
const { isSellerOrAdmin } = require("../app/middlewares/rbac.middleware");
const uploader = require("../app/middlewares/uploader.middleware");

const product_controller = new ProductController();

router
  .route("/")
  .post(
    isSellerOrAdmin,
    uploader.single("image"),
    product_controller.createProduct
  );

module.exports = router;
