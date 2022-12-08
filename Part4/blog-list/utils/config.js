require("dotenv").config();

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = 3003;

module.exports = {
  MONGODB_URL,
  PORT,
};
