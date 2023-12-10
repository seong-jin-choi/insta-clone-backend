import { ApolloServer, gql } from "apollo-server";
import client from "./client";
import { resolvers, typeDefs } from "./schema";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(() => console.log("server is running"));
