import client from "../../client";
import bcrypt from "bcrypt";
import Jwt, { JwtPayload } from "jsonwebtoken";

export default {
  Mutation: {
    updateAccount: async (_, { firstName, lastName, username, email, password }, { loggedInUser }) => {
      console.log(loggedInUser);

      let uglyPassword = null;
      if (password) {
        uglyPassword = await bcrypt.hash(password, 10);
      }
      const updatedUser = await client.user.update({
        where: {
          id: 1,
        },
        data: {
          firstName,
          lastName,
          username,
          email,
          ...(uglyPassword && { password: uglyPassword }),
        },
      });

      if (updatedUser.id) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "error",
        };
      }
    },
  },
};
