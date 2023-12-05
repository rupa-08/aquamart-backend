const mongoose = require("mongoose");
const StatusSchema = require("./common.schema");

const CategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parent_category: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Category",
        default: null,
      },
    ],
    brands: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Label",
        default: null,
      },
    ],
    ...StatusSchema,
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const LabelModel = mongoose.model("Category", CategorySchema);
module.exports = LabelModel;
