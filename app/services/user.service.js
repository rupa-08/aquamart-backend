const { dbConnect } = require("../services/mongodb.service");
const { db_name } = require("../../config/db.config");

class UserService {
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

  signupUser = async (data) => {
    try {
      const client = await dbConnect();
      const result = await client
        .db(db_name)
        .collection("users")
        .insertOne(data);

      return result;
    } catch (error) {
      console.error("Error in signupUser:", error);
      throw error;
    }
  };
}

module.exports = UserService;
