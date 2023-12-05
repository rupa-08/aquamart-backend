const express = require("express");
const app = express();

const router = express.Router();

const userRoute = require("./users.js");
const authRoute = require("./auth.js");
const labelRoute = require("./label.js");
const categoryRoute = require("./category.js");
const productRoute = require("./product.js");

const authCheck = require("../app/middlewares/auth.middlewares.js");

// http://localhost:9000/api/v1/user
router.use("/", authRoute);
router.use("/user", authCheck, userRoute);
router.use("/label", authCheck, labelRoute);
router.use("/category", authCheck, categoryRoute);
router.use("/product", authCheck, productRoute);

module.exports = router;
