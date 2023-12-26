import { gql } from "apollo-server";

export default gql`
  type updateAccount {
    ok: Boolean!
    error: String
  }
  type Mutation {
    updateAccount(firstName: String, lastName: String, username: String, email: String, password: String): updateAccount!
  }
`;