const mongoose = require("mongoose");
const StatusSchema = require("./common.schema");

const AddressSchema = new mongoose.Schema({
  name: String,
  houseNo: Number,
});

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      min: 8,
    },
    role: [
      {
        type: String,
        enum: ["admin", "seller", "customer"],
        default: "customer",
      },
    ],
    ...StatusSchema,
    address: {
      shipping: AddressSchema,
      biling: AddressSchema,
    },
    //   role_id: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Role",
    //   },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);
const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;
