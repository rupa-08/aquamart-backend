const express = require("express");
const router = express.Router();

const { isSellerOrAdmin } = require("../app/middlewares/rbac.middleware");
const CategoryController = require("../app/controllers/category.controller");
const uploader = require("../app/middlewares/uploader.middleware");

const category_controller = new CategoryController();

router
  .route("/")
  .post(isSellerOrAdmin, category_controller.createCategory)
  .get(category_controller.getCategory);

router
  .route("/:id")
  .get(category_controller.getCategoryById)
  .put(
    isSellerOrAdmin,
    uploader.single("file"),
    category_controller.updateCategory
  )
  .delete(isSellerOrAdmin, category_controller.deleteCategory);

module.exports = router;
