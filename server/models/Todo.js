const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
    todoText: {
        type: String,
        minlength: 1,
        maxLength: 300,
        trim: true,
    },
    completed: {
        type: Boolean,
    }
});

const Todo = model('Todo', todoSchema);

module.exports = Todo;