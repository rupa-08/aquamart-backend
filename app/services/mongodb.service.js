const { MongoClient } = require("mongodb");
const { db_url, db_name } = require("../../config/db.config");

const dbConnect = async () => {
  try {
    const client = await MongoClient.connect(db_url);

    return client;
  } catch (error) {
    throw new Error(`Error connecting to the database: ${error.message}`);
  }
};

module.exports = { dbConnect };
