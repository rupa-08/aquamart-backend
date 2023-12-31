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
    uploader.array("image"),
    product_controller.createProduct
  )
  .get(product_controller.getProduct);

router
  .route("/:id")
  .get(product_controller.getProductById)
  .put(
    isSellerOrAdmin,
    uploader.array("image"),
    product_controller.updateProduct
  )
  .delete(isSellerOrAdmin, product_controller.deleteProduct);

module.exports = router;
