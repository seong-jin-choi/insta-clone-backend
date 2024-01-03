import client from "../../client";
import bcrypt from "bcrypt";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    updateAccount: protectedResolver(async (_, { firstName, lastName, username, email, password, bio }, { loggedInUser }) => {
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
          bio,
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
    }),
  },
};
