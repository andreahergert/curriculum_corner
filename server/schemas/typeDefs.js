const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    password: String
    todo: [Todo]!
  }

  type Todo {
    _id: ID
    todoText: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    todo(username: String): [Todo]
    todo(todoId: ID!): Todo
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addTodo(todoText: String!, /* ADD id or some sort pf connection to user*/): Todo
    removeTodo(todoId: ID!): Todo
  }
`;

module.exports = typeDefs;