const { AuthenticationError } = require('apollo-server-express');
const { User, Todo } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('todos');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('todos');
    },
    todos: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Todo.find(params).sort({ createdAt: -1 });
    },
    todo: async (parent, { todoId }) => {
      return Todo.findOne({ _id: todoId });
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      console.log(user, token)
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addTodo: async (parent, { todoText, todoAuthor }) => {
      const todo = await Todo.create({ todoText, todoAuthor });

      await User.findOneAndUpdate(
        { username: todoAuthor },
        { $addToSet: { todos: todo._id } }
      );

      return todo;
    },
    removeTodo: async (parent, { todoId }) => {
      return Todo.findOneAndDelete({ _id: todoId });
    },
  },
};

module.exports = resolvers;
