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

      //image file name in an array
      if (request.files) {
        let images = [];
        request.files.map((image) => images.push(image.filename));
        data.image = images;
      }

      // setting null if the field is empty
      data.entertainment_features = data.entertainment_features ?? null;
      data.safety_features = data.safety_features ?? null;
      data.description = data.description ?? null;

      // calculating after discount price
      data.after_discount = data.price - (data.price * data.discount) / 100;

      // data validation
      this.product_service.validateProduct(data);

      // slug created.
      data["slug"] = slugify(data.name, {
        lower: true,
      });

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

      //image file name in an array
      if (request.files) {
        data.image = request.files.map((image) => image.filename);
      }

      // calculating after discount price
      data.after_discount = data.price - (data.price * data.discount) / 100;

      // setting null if the field is empty
      ["entertainment_features", "safety_features", "description"].forEach(
        (field) => {
          if (!data[field]) {
            delete data[field];
          }
        }
      );

      // deleting image field if no new images has been attached
      if (!data.image || data.image.length <= 0) {
        delete data.image;
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

      if (data) {
        if (data.image) {
          data.image.map((item) => {
            deleteImage(item);
          });
        }
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
