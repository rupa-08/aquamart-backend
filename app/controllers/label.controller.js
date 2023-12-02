const slugify = require("slugify");
const LabelService = require("../services/label.service");

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
}

module.exports = LabelController;
