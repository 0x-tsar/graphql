import dotenv from "dotenv";
dotenv.config();
import { ApolloServer, gql } from "apollo-server";
import { MongoClient } from "mongodb";
import { users } from "../data.js";

const initDB = async () => {
  const DB_NAME = process.env.DB_NAME;
  const DB_PASS = process.env.DB_PASS;

  const uri = `mongodb+srv://${DB_NAME}:${DB_PASS}@apicluster.5xlor.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  client.connect(async (err) => {
    const collection = await client.db("myFirstDatabase").collection("people");
    const dbData = await collection.find({}).toArray();
    console.log(dbData);
    // const data = await res.json(dbData);
    // perform actions on the collection object
    console.log(`connected`);
    client.close();
  });
};

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
        _id: String(Math.random()),
        name: args.name,
        email: args.email,
        active: true,
      };

      users.push(newUser);
      return newUser;
    },
  },
};

// mongoose.connect("mongodb://localhost:27017/graphql");
initDB();

const client = new ApolloServer({ typeDefs, resolvers });

client.listen(process.env.PORT || 5002, () =>
  console.log(`🔥 server listening`)
);
