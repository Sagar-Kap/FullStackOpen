const mongoose = require("mongoose");

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Person = mongoose.model("Person", personSchema);

const url = `mongodb+srv://jhunjhun:${password}@cluster0.omvuzhk.mongodb.net/test?retryWrites=true&w=majority`;

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
} else if (process.argv.length === 3) {
  mongoose.connect(url).then((result) => {
    Person.find({})
      .then((result) => {
        result.forEach((person) => {
          console.log(`${person.name} ${person.number}`);
        });
        return mongoose.connection.close();
      })
      .catch(() => {
        console.log("Please provide the correct password!");
        return mongoose.connection.close();
      });
  });
} else if (process.argv.length === 5) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected");
      const person = new Person({
        name: name,
        number: number,
      });
      return person.save();
    })
    .then(() => {
      console.log("Number Saved!");
      return mongoose.connection.close();
    })
    .catch(() => console.log("Please provide the password, name and number."));
} else {
  console.log("Please input complete information!");
}
