const slugify = require("slugify");
const LabelService = require("../services/label.service");
const { deleteImage } = require("../../config/helpers");

class LabelController {
  constructor() {
    this.label_service = new LabelService();
  }
  createLabel = async (request, response, callback) => {
    try {
      let data = request.body;

      if (request.file) {
        data.image = request.file.filename;
      }

      this.label_service.validateLabelContent(data);

      data["slug"] = slugify(data.title, {
        lower: true,
      });

      let result = await this.label_service.createLabel(data);

      response.json({
        status: true,
        message: data.type + " label created successfully.",
        result: result,
      });
    } catch (error) {
      callback(error);
    }
  };

  getLabel = async (request, response, callback) => {
    try {
      let filters = {};

      if (request.query.type) {
        filters = {
          type: request.query.type,
        };
      }

      let data = await this.label_service.getLabel(filters);

      response.json({
        result: data,
        message: "Label fetched.",
        status: true,
      });
    } catch (error) {
      callback(error);
    }
  };

  getLabelById = async (request, response, callback) => {
    try {
      let id = request.params.id;

      let data = await this.label_service.getLabelById(id);

      response.json({
        result: data,
        message: "Label fetched based on label id.",
        status: true,
      });
    } catch (error) {
      console.log(error);
      callback(error);
    }
  };

  updateLabel = async (request, response, callback) => {
    try {
      let data = request.body;
      if (request.file) {
        data.image = request.file.filename;
      }

      this.label_service.validateLabelContent(data, true);

      let result = await this.label_service.updateLabel(
        data,
        request.params.id
      );
      response.json({
        result: result,
        message: data.type + " updated successfully.",
        status: true,
      });
    } catch (error) {
      console.log(error);
      callback(error);
    }
  };

  deleteLabel = async (request, response, callback) => {
    try {
      let data = await this.label_service.deleteLabel(request.params.id);

      if (data) {
        let image = data.image;
        if (image) {
          deleteImage(image);
        }

        response.json({
          result: data,
          message: "Label deleted successfully.",
          status: true,
        });
      } else {
        callback({ status: 404, message: "Label doesnot exit anymore." });
      }
    } catch (error) {
      console.log("error", error);
      callback(error);
    }
  };
}

module.exports = LabelController;
