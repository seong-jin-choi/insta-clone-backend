import { PrismaClient } from "@prisma/client";
import { ApolloServer, gql } from "apollo-server";

const client = new PrismaClient();

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(title: String!): Boolean
  }
`;
const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_: any, { id }) => ({ title: "hello", year: 2021 }),
  },
  Mutation: {
    createMovie: (_: any, { title, year, genre }: { title: string; year: number; genre: string }) =>
      client.movie.create({ data: { title, year, genre } }),
    deleteMovie: () => "",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(() => console.log("server is running"));
