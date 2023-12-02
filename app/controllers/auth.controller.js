const bcrypt = require("bcrypt");
const UserService = require("../services/user.service");

class AuthController {
  constructor() {
    this.user_service = new UserService();
  }
  signin = async (req, res, callback) => {
    try {
      let data = await req.body;

      this.user_service.validateSignIn(data); //validating user
      let user = await this.user_service.signinUser(data); //stroing user in db
      let token = this.user_service.getAccessToken({ id: user._id }); // creating id token

      console.log("t", token);

      if (user) {
        res.json({
          status: true,
          result: {
            user: user,
            token: token,
          },
          message: "Signin successful.",
        });
      } else {
        throw user;
      }
    } catch (error) {
      console.log("error", error);
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
      data.password = bcrypt.hashSync(data.password, 10);

      let user = await this.user_service.signupUser(data);

      if (user) {
        res.json({
          status: true,
          result: user,
          message: "Registration successful.",
        });
      } else {
        throw user;
      }
    } catch (error) {
      console.log(error);
      callback({
        status: 500,
        message: error || "Internal Server Error",
      });
    }
  };
}

module.exports = AuthController;
