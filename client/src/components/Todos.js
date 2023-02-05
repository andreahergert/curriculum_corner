import React from 'react';
import { Link } from 'react-router-dom';

const Todos = ({ todos, title }) => {
  if (!todos.length) {
    return <h3>Add Todo's</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {todos &&
        todos.map((todo) => (
          <div key={todo._id} className="todoStyle">
            <h4 className="todoStyle">
              {todo.todoAuthor} <br />
              <span style={{ fontSize: '1rem' }}>
                had this todo on {todo.createdAt}
              </span>
            </h4>
            <div className="todoStyle">
              <p>{todo.todoText}</p>
            </div>
            <div className="">
            <button value={todo.completed}>{/*I dont know if the value is correct or what exactly we would need to put for the btn*/}</button>
            </div>
            <Link
              className=""
              to={`/todos/${todo._id}`}                
            >
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Todos;