import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_TODO } from '../utils/mutations';
import { QUERY_TODOS } from '../utils/queries';

import Auth from '../utils/auth';

const TodoForm = () => {
  const [todoText, setTodoText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addtodo, { error }] = useMutation(ADD_TODO, {
    update(cache, { data: { addTodo } }) {
      try {
        const { todos } = cache.readQuery({
          query: QUERY_TODOS,
        });

        cache.writeQuery({
          query: QUERY_TODOS,
          data: { todos: [addTodo, ...todos] },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addtodo({
        variables: {
          todoText,
          todoAuthor: Auth.getProfile().data.username,
        },
      });

      setTodoText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'todoText' && value.length <= 280) {
      setTodoText(value);
      setCharacterCount(value.length);
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div>
      <p className='todoTitle'>Add a Todo:</p>

      {Auth.loggedIn() ? (
        <>
          <p
            className={` todoCount${characterCount === 280 || error ? 'text-danger' : ''
              }`}
          >
            Character Count: {characterCount}/280
          </p>

          <form
            className="addTodo"
            onSubmit={handleFormSubmit}

          >
            <center>
              <textarea
                name="todoText"
                value={todoText}
                className="areaText"
                style={{ lineHeight: '5.5', resize: 'vertical', color: 'black' }}
                onChange={handleChange}
              ></textarea>

            </center>

            <div className='divWidth'>
              <button className="btn btnAddTudo mb-2" size="sm" type="submit" onClick={handleReload}>
                Add Todo
              </button>
            </div>
            {error && (
              <div>
                {error.message}
              </div>
            )}
          </form>

        </>
      ) : (
        <p>
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}

    </div>
  );
};

export default TodoForm;