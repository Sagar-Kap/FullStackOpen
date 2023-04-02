const mongoose = require("mongoose");
const Todo = require("./models/Todo");
require("dotenv").config();
const MONGO_URL = process.env.MONGO_URL;

if (MONGO_URL && !mongoose.connection.readyState)
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

module.exports = {
  Todo,
};
