const { request, response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: 5,
    name: "Chal hat",
    number: "100178",
  },
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/api/persons", (request, response) => {
  response.json(data);
});

app.get("/api/persons/info", (request, response) => {
  response.send(
    `<h2>Phonebook has info for ${
      data.length
    } people</h2><h2>${new Date()}</h2>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = data.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  data = data.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons/", (request, response) => {
  const id = getRandomInt(10, 10000);
  console.log(id);
  const body = request.body;

  if (body.name && body.number) {
    if (data.find((person) => person.name === body.name)) {
      response.status(404).send({ error: "Name must be unique" });
      console.log(data.map((person) => person.name === body.name));
    } else {
      const person = {
        name: body.name,
        number: body.number,
        id: id,
      };
      data = data.concat(person);
      response.json(person);
    }
  } else {
    response
      .status(404)
      .send({ error: "Values must be added to both name and number" });
  }
});
