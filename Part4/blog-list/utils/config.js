require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL;

module.exports = {
  MONGODB_URL,
  PORT,
};
