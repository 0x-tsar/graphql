import { ApolloServer, gql } from "apollo-server";
import { users } from "./data.js";

console.log(users);

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    hello: String!
    users: [User]!
  }
`;

const resolvers = {
  Query: {
    hello: () => `hello`,
    users: () => users,
  },
};

const client = new ApolloServer({ typeDefs, resolvers });

client.listen(5000, () => console.log(`🔥 server listening`));
