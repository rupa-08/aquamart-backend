const { MongoClient } = require("mongodb");
const { db_url, db_name } = require("../../config/db.config");

const dbConnect = async () => {
  try {
    const client = await MongoClient.connect(db_url);
    // const db = client.db(db_name);

    // if (!db) {
    //   throw new Error("Failed to obtain the database instance.");
    // }

    return client;
  } catch (error) {
    throw new Error(`Error connecting to the database: ${error.message}`);
  }
};

module.exports = { dbConnect };
