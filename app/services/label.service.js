const LabelModel = require("../models/label.schema");

class LabelService {
  validateLabelContent = (data) => {
    let message = {};

    if (!data?.title) {
      message["title"] = "Title is required.";
    }
    if (!data?.status) {
      message["status"] = "Status is required.";
    }
    if (data?.type === "banner" && !data.link) {
      message["link"] = "Banner link is required.";
    }

    if (Object.keys(message).length === 0) {
      return null;
    } else {
      throw { status: 400, message: message };
    }
  };
  createLabel = (data) => {
    try {
      let label = new LabelModel(data);
      return label.save();
    } catch (error) {
      throw { status: 400, message: error };
    }
  };
}

module.exports = LabelService;
