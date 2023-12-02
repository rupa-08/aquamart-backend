const jwt = require("jsonwebtoken");
const ENV = require("../../config/app.config");
const UserModel = require("../models/user.model");

const authCheck = (request, response, callback) => {
  try {
    let token = null;

    // getting token
    if (request.headers["authorization"]) {
      token = request.headers["authorization"];
    }

    if (request.headers["x-xsrf-token"]) {
      token = request.headers["x-xsrf-token"];
    }

    if (request.query.token) {
      token = request.query.token;
    }

    // checking token
    if (token === null) {
      return callback({ status: 401, mesaage: "Unauthenticated." });
    } else {
      let splitToken = token.split(" ");
      token = splitToken.pop();

      // token data verification
      jwt.verify(token, ENV.JWT_SECRET, async (error, data) => {
        if (error) {
          callback({
            status: 403,
            message: error,
          });
        } else {
          let user = await UserModel.findById(data.id);

          if (user) {
            request.auth_user = user;
            callback();
          } else {
            callback({
              status: 403,
              message: "Invalid Token or user doesnot exist.",
            });
          }
        }
      });
    }
  } catch (error) {
    callback({ status: 400, message: error });
  }
};

module.exports = authCheck;
