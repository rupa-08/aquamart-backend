const CategoryModel = require("../models/category.schema");

class LabelService {
  validateCategory = (data) => {
    let message = {};

    if (!data.category) {
      message["category"] = "Category is required.";
    }
    if (!data.status) {
      message["status"] = "Status is required.";
    }

    if (Object.keys(message).length === 0) {
      return null;
    } else {
      throw { status: 400, message: message };
    }
  };
  createCategory = (data) => {
    try {
      let category = new CategoryModel(data);
      return category.save();
    } catch (error) {
      throw { status: 400, message: error };
    }
  };

  getCategory = async (filters = {}) => {
    try {
      let category = await CategoryModel.find(filters);
      if (category) {
        return category;
      } else {
        throw { status: 404, message: "No category found." };
      }
    } catch (error) {
      throw { status: 400, message: error };
    }
  };

  getCategoryById = async (id) => {
    try {
      let data = await CategoryModel.findById(id);
      if (data) {
        return data;
      } else {
        throw { status: 404, message: "No category found." };
      }
    } catch (error) {
      throw { status: 400, message: "Category by id fetched." };
    }
  };

  updateCategory = async (id, data) => {
    try {
      let result = await CategoryModel.findByIdAndUpdate(id, {
        $set: data,
      });

      if (result) {
        return result;
      } else {
        throw {
          status: 400,
          message: "Category updated unsuccessfull.",
        };
      }
    } catch (error) {
      throw { status: 400, message: error };
    }
  };

  deleteCategory = async (id) => {
    try {
      let result = await CategoryModel.findByIdAndDelete(id);

      if (result) {
        return result;
      } else {
        throw { status: 400, message: "Category doesn't exist." };
      }
    } catch (error) {
      throw { status: 400, message: error };
    }
  };
}

module.exports = LabelService;
