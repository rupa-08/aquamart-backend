const express = require("express");
const app = express();

const router = express.Router();

const userRoute = require("./users.js");
const authRoute = require("./auth.js");
const labelRoutes = require("./label.js");
const categoryRoutes = require("./category.js");

const authCheck = require("../app/middlewares/auth.middlewares.js");

// http://localhost:9000/api/v1/user
router.use("/", authRoute);
router.use("/user", authCheck, userRoute);
router.use("/label", authCheck, labelRoutes);
router.use("/category", authCheck, categoryRoutes);

module.exports = router;
