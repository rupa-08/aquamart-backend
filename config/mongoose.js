const mongoose = require("mongoose");
const { db_name, db_url } = require("./db.config");
let connect_url = db_url + "/" + db_name;

// database connection
mongoose
  .connect(connect_url, {
    autoCreate: true,
    autoIndex: true,
  })
  .then(() => console.log("Databse connection success"))
  .catch((error) => {
    "Database connection failed.", error;
  });
