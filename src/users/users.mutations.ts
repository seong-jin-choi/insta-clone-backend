import client from "../client";
import bcrypt from "bcrypt";
export default {
  Mutation: {
    createAccount: async (_, { firstName, lastName, username, email, password }) => {
      const existingUser = await client.user.findFirst({ where: { OR: [{ username }, { email }] } });
      console.log(existingUser);

      const HashedPassword = await bcrypt.hash(password, 10);

      return client.user.create({ data: { firstName, lastName, username, email, password: HashedPassword } });
    },
  },
};
