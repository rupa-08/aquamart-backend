const router = require("express").Router();

const AuthController = require("../app/controllers/auth.controller");

const auth_ctrl = new AuthController();
const uploader = require("../app/middlewares/uploader.middleware");

router.post("/signup", uploader.single("image"), auth_ctrl.signup);
router.post("/login", auth_ctrl.signin);

module.exports = router;
