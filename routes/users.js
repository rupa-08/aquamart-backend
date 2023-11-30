const express = require("express");
const router = express.Router();

const UserController = require("../app/controllers/user.controller");
const user_ctl = new UserController();

router.route("/").get(user_ctl.getAllUsers);
// .post((req, res, next) => {
//   res.send("User created");
// });

router
  .route("/:id")
  .get(user_ctl.getUserById)
  .put(user_ctl.updateUser)
  .delete(user_ctl.deleteUser);

module.exports = router;
