const UserService = require("../services/user.service");

class UserController {
  constructor() {
    this.user_service = new UserService();
  }

  getAllUsers = async (request, response, callback) => {
    try {
      let users = await this.user_service.getAllUsers();
      response.json({
        result: users,
        status: true,
        message: "User fetched.",
      });
    } catch (error) {
      callback(error);
    }
  };

  findAdminUser = async (request, response, callback) => {
    try {
      let users = await this.user_service.findAllAdmin();
      response.json({
        result: users,
        status: true,
        message: "Admin users fetched.",
      });
    } catch (error) {
      callback(error);
    }
  };

  getUserById = async (request, response, callback) => {
    try {
      let user = await this.user_service.findUserById(request.params?.id);

      response.json({
        result: user,
        status: true,
        message: "User info fetched.",
      });
    } catch (error) {
      callback(error);
    }
  };

  updateUser = async (request, response, callback) => {
    if (
      request.auth_user.id !== request.params.id &&
      request.auth_user.role !== "admin"
    ) {
      callback({
        status: 403,
        message: "Unauthorized access.",
      });
    }
    response.json({
      result: null,
      status: true,
      message: "User updated.",
    });
  };

  deleteUser = (request, response, callback) => {
    if (
      request.auth_user.id !== request.params.id &&
      request.auth_user.role !== "admin"
    ) {
      callback({
        status: 403,
        message: "Unauthorized access.",
      });
    }
    response.json({
      result: null,
      status: true,
      message: "User deleted..",
    });
  };
}

module.exports = UserController;
