import client from "../../client";

export default {
  Query: {
    getAccount: (_, { username }) =>
      client.user.findUnique({
        where: {
          username,
        },
      }),
  },
};
