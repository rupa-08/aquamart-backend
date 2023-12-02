const { dbConnect } = require("../services/mongodb.service");
const { db_name } = require("../../config/db.config");
const { ObjectId } = require("mongodb");
const UserModel = require("../models/user.model");

class UserService {
  // validations
  validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  validateUser = (data) => {
    let error = {};
    if (!data.name) {
      error.name = "Name is required";
    }

    if (!data.email) {
      error.email = "Email is reqired.";
    } else {
      if (!this.validateEmail(data?.email)) {
        error.email = "Invalid email format";
      }
    }

    if (Object.keys(error).length) {
      throw { status: 400, message: error };
    } else {
      return null;
    }
  };

  validateSignIn = (data) => {
    let error = {};
    if (!data?.email) {
      error.email = "Email is required.";
    } else {
      if (!this.validateEmail(data?.email)) {
        error.email = "Invalid Email Format";
      }
    }

    if (!data?.password) {
      error.password = "Password is required";
    }

    if (Object.keys(error).length) {
      throw { status: 400, message: error };
    } else {
      return null;
    }
  };

  // db services

  signupUser = async (data) => {
    let user_obj = new UserModel(data);
    return await user_obj.save();
  };

  signinUser = async (data) => {
    let user = await UserModel.findOne({
      email: data?.email,
      password: data?.password,
    });
    if (user) {
      return user;
    } else {
      throw { status: 400, message: "Credentials does not match." };
    }
  };

  getAllUsers = async () => {
    let users = await UserModel.find();
    if (users) {
      return users;
    } else {
      throw { status: 400, message: "Users not found." };
    }
  };

  findUserById = async (id) => {
    let user = await UserModel.findById(id);
    if (user) {
      return user;
    } else {
      throw { status: 400, message: "User does not exist." };
    }
  };

  findAllAdmin = async () => {
    let adminUsers = await UserModel.find({
      role: "admin",
    });
    return adminUsers;
  };
}

module.exports = UserService;
