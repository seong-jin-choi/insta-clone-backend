import client from "../src/client";
export default {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_: any, { id }) => client.movie.findUnique({ where: { id } }),
  },
};
