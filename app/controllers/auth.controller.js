const UserService = require("../services/user.service");

class AuthController {
  constructor() {
    this.user_service = new UserService();
  }

  signin = (req, res, next) => {};

  signup = async (req, res, callback) => {
    try {
      let data = req.body;
      data.image = req.file.filename;

      this.user_service.validateUser(data); //validating user
      let response = await this.user_service.signupUser(data); //stroing user in db

      if (response) {
        res.json({
          status: true,
          result: response,
          message: "Registration successful.",
        });
      } else {
        throw response;
      }
    } catch (error) {
      callback({
        status: 500,
        message: error.message || "Internal Server Error",
      });
    }
  };
}

module.exports = AuthController;
