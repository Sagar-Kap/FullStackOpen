const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("Connecting to ", url);

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: (number) => {
        return /^(\d{2,3}-)?\d{7,}$/.test(number);
      },
      message: "Invalid Phone number",
    },
    minlength: 8,
    message: "Phone number less than 8.",
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (docuement, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
