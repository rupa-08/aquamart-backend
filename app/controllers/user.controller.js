const UserService = require("../services/user.service");

class UserController {
  constructor() {
    this.user_service = new UserService();
  }

  getAllUsers = async (req, res, callback) => {
    try {
      let users = await this.user_service.getAllUsers();
      res.json({
        result: users,
        status: true,
        message: "User fetched.",
      });
    } catch (error) {
      callback(error);
    }
  };

  getUserById = (req, res, callback) => {
    let user = {};
    res.json({
      result: user,
      status: true,
      message: "User info fetched.",
    });
  };

  updateUser = (req, res, callback) => {
    res.json({
      result: null,
      status: true,
      message: "User updated",
    });
  };

  deleteUser = (req, res, callback) => {
    res.json({
      result: null,
      status: true,
      message: "User deleted.",
    });
  };
}

module.exports = UserController;
