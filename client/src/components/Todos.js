import React from 'react';
import { Link } from 'react-router-dom';

const Todos = ({ todos, title, handleRemoveTodo }) => {
  if (!todos.length) {
    return <h3>Add Todo's</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {todos &&
        todos.map((todo) => (
          <div key={todo._id}>
            <div className='todoLive'>
            <h4>
              {todo.todoAuthor} <br />
              <span style={{ fontSize: '1rem' }}>
                added this todo on {todo.createdAt}
              </span>
            </h4>
            <div className="todoStyle">
              <p>• {todo.todoText}</p>
            </div>
            
            <div>
            <button 
                className="btn btnBlue"
                onClick={() => handleRemoveTodo(todo._id)}
              >
                Remove Todo
              </button>
            <button className="btn btnGreen" value={todo.completed}>{/*I dont know if the value is correct or what exactly we would need to put for the btn*/}Completed</button>
            </div>
            </div>
            <Link
              className="h1"
              to={`/todos/${todo._id}`}                
            >
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Todos;