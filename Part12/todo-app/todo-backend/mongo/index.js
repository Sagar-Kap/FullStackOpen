const mongoose = require("mongoose");
const Todo = require("./models/Todo");
const  MONGO_URL  = "mongodb://the_username:the_password@localhost:3456/the_database"

if (MONGO_URL && !mongoose.connection.readyState)
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

module.exports = {
  Todo,
};
