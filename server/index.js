const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");

const typeDefs = require("./schema");
const resolvers = require("./resolver");
const dataMethods = require("./data")

const port = process.env.PORT || 3000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connectDB();

async function startApolloServer(typeDefs, resolvers) {
  const server = new ApolloServer({ typeDefs, resolvers, context: () => ({ dataMethods }) });
  const app = express();
  app.use(cors());

  await server.start();
  server.applyMiddleware({ app });

  app.listen(port, () =>
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
  );
}
startApolloServer(typeDefs, resolvers);