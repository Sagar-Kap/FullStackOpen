require("dotenv").config();

const PORT = process.env.PORT;
const URL = process.env.MONGODB_URL;

module.exports = {
  PORT,
  URL,
};
