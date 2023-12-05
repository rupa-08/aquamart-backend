const mongoose = require("mongoose");
const StatusSchema = require("./common.schema");

const LabelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["banner", "brand"],
      default: "banner",
    },
    link: String,
    image: {
      type: String,
      required: [true, "Image is required."],
    },
    ...StatusSchema,
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const LabelModel = mongoose.model("Label", LabelSchema);
module.exports = LabelModel;
