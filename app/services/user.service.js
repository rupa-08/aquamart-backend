const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const ENV = require("../../config/app.config");
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
    });
    if (user) {
      let passwordValid = bcrypt.compareSync(data?.password, user?.password);
      if (passwordValid) {
        return user;
      } else {
        throw { status: 401, message: "Invalid Password" };
      }
    } else {
      throw { status: 400, message: "User not found." };
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

  getAccessToken = (payload) => {
    let token = jwt.sign(payload, ENV.JWT_SECRET);
    return token;
  };
}

module.exports = UserService;
