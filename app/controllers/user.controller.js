class UserController {
  getAllUsers = (req, res, next) => {
    let users = [];
    res.json({
      result: users,
      status: true,
      message: "User fetched.",
    });
  };

  getUserById = (req, res, next) => {
    let user = {};
    res.json({
      result: user,
      status: true,
      message: "User info fetched.",
    });
  };

  updateUser = (req, res, next) => {
    res.json({
      result: null,
      status: true,
      message: "User updated",
    });
  };

  deleteUser = (req, res, next) => {
    res.json({
      result: null,
      status: true,
      message: "User deleted.",
    });
  };
}

module.exports = UserController;
