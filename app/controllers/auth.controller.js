const UserService = require("../services/user.service");

class AuthController {
  constructor() {
    this.user_service = new UserService();
  }

  signin = (req, res, next) => {};

  signup = (req, res, callback) => {
    try {
      let data = req.body;
      data.image = req.file.filename;

      this.user_service.validateUser(data);
      // to do db
      req.myEvents.emit("signup", data);

      res.json({
        result: data,
        status: true,
        message: "Successful",
      });
    } catch (error) {
      callback(error);
    }
  };
}

module.exports = AuthController;
