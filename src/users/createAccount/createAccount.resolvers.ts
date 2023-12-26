import client from "../../client";
import bcrypt from "bcrypt";
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
  },
};
