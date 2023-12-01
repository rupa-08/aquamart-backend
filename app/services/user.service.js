const { dbConnect } = require("../services/mongodb.service");
const { db_name } = require("../../config/db.config");

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

  // storing to db

  signupUser = async (data) => {
    try {
      const client = await dbConnect();
      const result = await client
        .db(db_name)
        .collection("users")
        .insertOne(data);

      return result;
    } catch (error) {
      console.error("Error in sign up:", error);
      throw error;
    }
  };

  signinUser = async (data) => {
    try {
      const client = await dbConnect();
      const result = await client.db(db_name).collection("users").findOne({
        email: data.email,
        password: data.password,
      });
      if (result) {
        return result;
      } else {
        throw { status: 400, message: "Credentials does not match." };
      }
    } catch (error) {
      console.error("Error in sign in:", error);
      throw error;
    }
  };
}

module.exports = UserService;
