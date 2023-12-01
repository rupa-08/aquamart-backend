const UserService = require("../services/user.service");

class AuthController {
  constructor() {
    this.user_service = new UserService();
  }
  signin = async (req, res, callback) => {
    try {
      let data = await req.body;

      this.user_service.validateSignIn(data); //validating user
      let response = await this.user_service.signinUser(data); //stroing user in db

      if (response) {
        res.json({
          status: true,
          response: response,
          message: "Signin successful.",
        });
      } else {
        throw response;
      }
    } catch (error) {
      callback({
        status: 500,
        message: error || "Internal Server Error",
      });
    }
  };

  signup = async (req, res, callback) => {
    try {
      let data = req.body;
      data.image = req.file.filename;

      this.user_service.validateUser(data);
      let response = await this.user_service.signupUser(data);

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
        message: error || "Internal Server Error",
      });
    }
  };
}

module.exports = AuthController;
