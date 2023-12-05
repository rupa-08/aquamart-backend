const mongoose = require("mongoose");
const StatusSchema = require("../models/common.schema");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      required: true,
    },
    mileage: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 100,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    after_discount: {
      type: Number,
      min: 1,
    },
    image: {
      type: String,
      required: [true, "Image is required."],
    },
    description: {
      type: String,
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
    safety_features: [
      {
        type: String,
      },
    ],
    entertainment_features: [
      {
        type: String,
      },
    ],
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Label",
      default: null,
    },

    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    ...StatusSchema,
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;
