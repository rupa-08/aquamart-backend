const ProductModel = require("../models/product.schema");

class ProductService {
  validateProduct = (data) => {
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

    if (!data.image) {
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
}
module.exports = ProductService;
