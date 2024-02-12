const dotenv = require("dotenv");
dotenv.config();

const MongoClient = require("mongodb").MongoClient;

// declare variable for database
let database;

// function for database setup
const initDb = (callback) => {
  if (database) {
    console.log("Db is already initialized");
    return callback(null, database);
  }
  MongoClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

// function to get database
const getDatabase = () => {
  if (!database) {
    throw Error("Database not initialized");
  }
  return database;
};

// export functions
module.exports = {
  initDb,
  getDatabase,
};
