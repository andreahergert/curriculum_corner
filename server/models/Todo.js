const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const todoSchema = new Schema({
    todoText: {
        type: String,
        minlength: 1,
        maxLength: 300,
        trim: true,
    },
    todoAuthor: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    completed: {
        type: Boolean,
    }
});

const Todo = model('Todo', todoSchema);

module.exports = Todo;