const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    todos: [Todo]!
  }

  type Todo {
    _id: ID!
    todoText: String!
    todoAuthor: String!
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    todos(username: String!): [Todo]
    todo(todoId: ID!): Todo
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addTodo(todoText: String!, todoAuthor: String!): Todo
    removeTodo(todoId: ID!): Todo
    updateTodo(todoId: ID!, todoText: String!, todoAuthor: String!): Todo
  }
`;

module.exports = typeDefs;
