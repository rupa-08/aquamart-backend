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
      callback({
        status: 500,
        message: error || "Internal Server Error",
      });
    }
  };

  findAdminUser = async (req, res, callback) => {
    try {
      let users = await this.user_service.findAllAdmin();
      res.json({
        result: users,
        status: true,
        message: "Admin users fetched.",
      });
    } catch (error) {
      callback({
        status: 500,
        message: error || "Internal Server Error",
      });
    }
  };

  getUserById = async (req, res, callback) => {
    try {
      let user = await this.user_service.findUserById(req.params?.id);

      res.json({
        result: user,
        status: true,
        message: "User info fetched.",
      });
    } catch (error) {
      callback({
        status: 500,
        message: error || "Internal Server Error",
      });
    }
  };

  updateUser = async (req, res, callback) => {
    try {
      res.json({
        result: null,
        status: true,
        message: "User updated.",
      });
    } catch (error) {
      callback({
        status: 500,
        message: error || "Internal Server Error",
      });
    }
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
