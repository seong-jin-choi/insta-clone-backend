import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
  type Movie {
    id: Int
    title: String
    year: Int
  }
  type Query {
    movies: [Movie]
    movie: Movie
  }
  type Mutation {
    createMovie(title: String!): Boolean
    deleteMovie(title: String!): Boolean
  }
`;
const resolvers = {
  Query: {
    movies: () => [],
    movie: () => ({ title: "hello", year: 2021 }),
  },
  Mutation: {
    createMovie: (_: any, args: any) => {
      console.log(args);
      return true;
    },
    deleteMovie: () => "",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(() => console.log("server is running"));