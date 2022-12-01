const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("Connecting to ", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });

const validateNum = [
  {
    validator: (number) => {
      if ((number[2] === "-" || number[3] === "-") && number.length < 9) {
        return false;
      }
      return true;
    },
    msg: "must be at least 8 digits",
  },
  {
    validator: (number) => {
      return /^\d{2,3}-\d+$/.test(number);
    },
    msg: "invalid phone number",
  },
];

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: Number,
    validate: validateNum,
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
