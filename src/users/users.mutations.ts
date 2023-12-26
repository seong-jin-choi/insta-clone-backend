import client from "../client";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
export default {
  Mutation: {
    createAccount: async (_, { firstName, lastName, username, email, password }) => {
      try {
        const existingUser = await client.user.findFirst({ where: { OR: [{ username }, { email }] } });
        if (existingUser) {
          throw new Error("This username/password is already taken.");
        }
        const HashedPassword = await bcrypt.hash(password, 10);

        return client.user.create({ data: { firstName, lastName, username, email, password: HashedPassword } });
      } catch (error) {
        return error;
      }
    },
    login: async (_, { username, password }) => {
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return {
          ok: false,
          error: "Invalid Password",
        };
      }
      const token = Jwt.sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
