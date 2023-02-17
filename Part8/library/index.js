const typeDefs = require("./graphQL/schema");
const resolvers = require("./graphQL/resolvers");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

mongoose
  .connect(config.URL)
  .then(() => {
    logger.info("Successfully connected to Mongo DB!");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB: ", error.message);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: config.PORT },
}).then(({ url }) => {
  logger.info(`Server ready at ${url}`);
});
