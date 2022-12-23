require("dotenv").config();

const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const PORT = 3003;
const SECRET = process.env.SECRET;

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
};
