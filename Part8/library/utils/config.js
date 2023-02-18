require("dotenv").config();

const PORT = process.env.PORT;
const URL = process.env.MONGODB_URL;
const SECRET = process.env.SECRET;

module.exports = {
  PORT,
  URL,
  SECRET,
};
