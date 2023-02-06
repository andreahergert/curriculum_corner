import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

  export const ADD_TODO = gql`
  mutation addTodo($todoAuthor: String!, $todoText: String!) {
    addTodo(todoAuthor: $todoAuthor, todoText: $todoText) {
      _id
      todoText
      todoAuthor
      createdAt
    }
  }`;

  export const MARK_TODO_AS_COMPLETED = gql`
  mutation markTodoAsCompleted($todoId: ID!) {
    markTodoAsCompleted(todoId: $todoId) {
      _id
      todoText
      todoAuthor
      completed
    }
  }
`;

export const REMOVE_TODO = gql`
mutation removeTodo($todoId: ID!) {
  removeTodo(todoId: $todoId) {
    _id
    todoText
    todoAuthor
  }
}
`;