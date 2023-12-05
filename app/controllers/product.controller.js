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
}

module.exports = ProductController;
