const { gql } = require('apollo-server-express');

// There are some examples that use email: String! under Mutation/login instead of username,  if we are having issues with the login maybe we can look at that

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    todos: [Todo]!
  }

  type Todo {
    _id: ID
    todoText: String
    todoAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    todos(username: String): [Todo]
    todo(todoId: ID!): Todo
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addTodo(todoText: String!, todoAuthor: String!): Todo
    removeTodo(todoId: ID!): Todo
  }
`;

module.exports = typeDefs;