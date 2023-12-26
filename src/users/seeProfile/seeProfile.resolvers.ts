import client from "../../client";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
export default {
  Query: {
    seeProfile: (_, { username }) =>
      client.user.findUnique({
        where: {
          username,
        },
      }),
  },
};
