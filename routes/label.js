const express = require("express");
const router = express.Router();

const LabelController = require("../app/controllers/label.controller");
const { isAdmin } = require("../app/middlewares/rbac.middleware");
const uploader = require("../app/middlewares/uploader.middleware");

const label_controller = new LabelController();

router
  .route("/")
  .post(isAdmin, uploader.single("image"), label_controller.createLabel);

module.exports = router;
