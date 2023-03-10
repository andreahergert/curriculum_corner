import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Todos = ({
  todos,
  title,
  handleRemoveTodo,
  handleMarkTodoAsCompleted,
  completedTodos,
}) => {
  const loggedInUsername = Auth.getProfile().data.username;
  if (!todos.length) {
    return <h3>Add Todo's</h3>;
  }

  const handleClick = (todoId) => {
    handleRemoveTodo(todoId);
    window.location.reload();
  };

  return (
    <div>
      <h3>{title}</h3>
      {todos &&
        todos
          .filter((todo) => todo.todoAuthor === loggedInUsername)
          .map((todo) => (
            <div key={todo._id}>
              <div className="todoLive">
                <h4>
                  {todo.todoAuthor} <br />
                  <span style={{ fontSize: "1rem" }}>
                    added this todo on {todo.createdAt}
                  </span>
                </h4>
                <div className="todoStyle">
                  <p>• {todo.todoText}</p>
                </div>

                <div>
                  <button
                    className="btn btnBlue"
                    onClick={() => handleClick(todo._id)}
                  >
                    Remove Todo
                  </button>
                  <button
                    className={`btn ${
                      todo.completed || completedTodos.includes(todo._id) ? "btnCompleted" : "btnGreen"
                    }`}
                    onClick={() => {
                      handleMarkTodoAsCompleted(todo._id, !todo.completed);
                    }}
                  >
                    Completed
                  </button>
                </div>
              </div>
              <Link className="h1" to={`/todos/${todo._id}`}></Link>
            </div>
          ))}
    </div>
  );
};

export default Todos;
