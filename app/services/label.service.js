const LabelModel = require("../models/label.schema");

class LabelService {
  // validation
  validateLabelContent = (data, is_edit = false) => {
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

    if (!data.image && !is_edit) {
      message["image"] = "Image link is required.";
    }

    if (Object.keys(message).length === 0) {
      return null;
    } else {
      throw { status: 400, message: message };
    }
  };

  // CRUD db operations
  createLabel = (data) => {
    try {
      let label = new LabelModel(data);
      return label.save();
    } catch (error) {
      throw { status: 400, message: error };
    }
  };
  getLabel = async (filters = {}) => {
    try {
      let label = await LabelModel.find(filters);
      if (label) {
        return label;
      } else {
        throw {
          status: 400,
          message: "No label found",
        };
      }
    } catch (error) {
      throw { status: 400, message: error };
    }
  };
  getLabelById = async (id) => {
    try {
      let label = await LabelModel.findById(id);
      if (label) {
        return label;
      } else {
        throw {
          status: 400,
          message: "No label found",
        };
      }
    } catch (error) {
      throw { status: 400, message: error };
    }
  };
  updateLabel = async (data, id) => {
    try {
      const label = await LabelModel.findByIdAndUpdate(id, {
        $set: data,
      });
      if (label) {
        return label;
      } else {
        throw {
          status: 400,
          message: "Label update unsuccessful.",
        };
      }
    } catch (error) {
      throw { status: 400, message: error };
    }
  };
  deleteLabel = async (id) => {
    try {
      const deletedLabel = await LabelModel.findByIdAndDelete({ _id: id });
      return deletedLabel;
    } catch (error) {
      throw { status: 400, message: "Error deleting the label." };
    }
  };
}

module.exports = LabelService;
