const { deleteImage } = require("../../config/helpers");
const ProductService = require("../services/product.services");
const slugify = require("slugify");

class ProductController {
  constructor() {
    this.product_service = new ProductService();
  }
  createProduct = async (request, response, callback) => {
    try {
      let data = request.body;

      if (request.file) {
        data.image = request.file.filename;
      }

      data["slug"] = slugify(data.name, {
        lower: true,
      });

      this.product_service.validateProduct(data);

      let result = await this.product_service.createProduct(data);
      response.json({
        result: result,
        message: "Product created successfully.",
        status: true,
      });
    } catch (error) {
      callback(error);
    }
  };

  getProduct = async (request, response, callback) => {
    try {
      let filters = {};

      if (request.query.product_name) {
        filters = {
          name: request.query.product_name,
        };
      }

      let data = await this.product_service.getProduct(filters);

      response.json({
        result: data,
        message: "Product fetched successfully.",
        status: true,
      });
    } catch (error) {
      callback(error);
    }
  };

  getProductById = async (request, response, callback) => {
    try {
      let id = request.params.id;

      let product = await this.product_service.getProductById(id);
      response.json({
        result: product,
        status: true,
        message: "Product fetched by id.",
      });
    } catch (error) {
      callback(error);
    }
  };

  updateProduct = async (request, response, callback) => {
    try {
      let data = request.body;

      if (request.file) {
        data.image = request.file.filename;
      }

      this.product_service.validateProduct(data, true);

      let updatedProduct = await this.product_service.updateProduct(
        request.params.id,
        data
      );

      response.json({
        result: updatedProduct,
        message: "Product updated successful.",
        status: true,
      });
    } catch (error) {
      callback(error);
    }
  };
  deleteProduct = async (request, response, callback) => {
    try {
      let id = request.params.id;
      let data = await this.product_service.deleteProduct(id);

      if (data && data.image) {
        deleteImage(data.image);
      }

      response.json({
        result: data,
        message: "Product deleted successfully.",
        status: true,
      });
    } catch (error) {
      callback(error);
    }
  };
}

module.exports = ProductController;
