const typeDefs = require("./graphQL/schema");
const resolvers = require("./graphQL/resolvers");
const mongoose = require("mongoose");
const config = require("./utils/config");

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

mongoose
  .connect(config.URL)
  .then(() => {
    console.log("Successfully connected to Mongo DB!");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error.message);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
