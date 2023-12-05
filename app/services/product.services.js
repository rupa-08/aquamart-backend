const ProductModel = require("../models/product.schema");

class ProductService {
  validateProduct = (data, is_edit = false) => {
    const requiredFields = [
      "name",
      "color",
      "mileage",
      "model",
      "price",
      "status",
      "brand",
      "category",
    ];
    let message = {};

    requiredFields.forEach((field) => {
      if (!data[field]) {
        message[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required.`;
      }
    });

    if (!data.image && !is_edit) {
      message["image"] = "Image is required";
    }

    if (Object.keys(message).length === 0) {
      return null;
    } else {
      throw {
        status: 400,
        message: message,
      };
    }
  };

  createProduct = (data) => {
    try {
      let product = new ProductModel(data);
      return product.save();
    } catch (error) {
      throw { status: 400, message: error };
    }
  };

  getProduct = async (filters = {}) => {
    try {
      let product = await ProductModel.find(filters);

      if (product) {
        return product;
      } else {
        throw { status: 400, message: "Data not found." };
      }
    } catch (error) {
      throw { status: 400, message: error };
    }
  };

  getProductById = async (id) => {
    try {
      let product = await ProductModel.findById(id);

      if (product) {
        return product;
      } else {
        throw {
          status: 400,
          message: "Product fetched by id unsuccessful.",
        };
      }
    } catch (error) {
      throw { status: 400, message: "Product not found." };
    }
  };

  updateProduct = async (id, data) => {
    try {
      let product = await ProductModel.findByIdAndUpdate(id, {
        $set: data,
      });
      if (product) {
        return product;
      } else {
        throw { status: 400, message: "Product updated failed" };
      }
    } catch (error) {
      throw { status: 400, message: error };
    }
  };
}
module.exports = ProductService;
