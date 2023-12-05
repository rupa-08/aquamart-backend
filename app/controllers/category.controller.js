const slugify = require("slugify");
const CategoryService = require("../services/category.service");

class CategoryController {
  constructor() {
    this.category_service = new CategoryService();
  }
  createCategory = async (request, response, callback) => {
    try {
      let data = request.body;

      this.category_service.validateCategory(data);

      data["slug"] = slugify(data.category, {
        lower: true,
      });

      if (!data.parent_category) {
        data.parent_category = null;
      }

      let result = await this.category_service.createCategory(data);

      response.json({
        result: result,
        status: true,
        message: "Category created successfully.",
      });
    } catch (error) {
      console.log("Error", error);
      callback(error);
    }
  };

  getCategory = async (request, response, callback) => {
    try {
      let filters = {};

      if (request.query.category) {
        filters = {
          category: request.query.category,
        };
      }

      let data = await this.category_service.getCategory(filters);

      response.json({
        result: data,
        message: "Category fetched.",
        status: true,
      });
    } catch (error) {
      callback(error);
    }
  };

  getCategoryById = async (request, response, callback) => {
    try {
      let id = request.params.id;

      let data = await this.category_service.getCategoryById(id);

      response.json({
        result: data,
        message: "Category by id fetched.",
        status: true,
      });
    } catch (error) {
      callback(error);
    }
  };

  updateCategory = async (request, response, callback) => {
    try {
      let data = request.body;

      this.category_service.validateCategory(data);

      let result = await this.category_service.updateCategory(
        request.params.id,
        data
      );

      response.json({
        result: result,
        message: "Category updated successfully",
        status: true,
      });
    } catch (error) {
      console.log(error);
      callback(error);
    }
  };

  deleteCategory = async (request, response, callback) => {
    try {
      let id = request.params.id;

      let data = await this.category_service.deleteCategory(id);

      response.json({
        result: data,
        status: true,
        message: "Category deleted successfully.",
      });
    } catch (error) {
      callback(error);
    }
  };
}

module.exports = CategoryController;
