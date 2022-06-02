import { ApolloServer, gql } from "apollo-server";
import { users } from "./data.js";

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
    users: [User!]!
    user(name: String!): User
  }

  # MUTATION

  type Mutation {
    newUser(name: String, email: String): User
  }
`;

const resolvers = {
  Query: {
    hello: () => `hello`,
    users: () => users,
    user: (_, args) => {
      const usuario = users.find((user) => user.name === args.name);
      if (!usuario)
        return {
          _id: "",
          name: "",
          email: "",
          active: false,
        };
      return users.find((user) => user.name === args.name);
    },
  },

  Mutation: {
    newUser: (_, args) => {
      const newUser = {
        _id: String(Math.random),
        name: args.name,
        email: args.email,
        active: true,
      };

      users.push(newUser);
      return newUser;
    },
  },
};

const client = new ApolloServer({ typeDefs, resolvers });

client.listen(5000, () => console.log(`🔥 server listening`));
