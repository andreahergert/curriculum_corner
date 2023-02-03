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
    console.log('handle quotes', name, value)
    if (name === 'todoText' && value.length <= 280) {
      setTodoText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>Add a Todo:</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''
              }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className=""
            onSubmit={handleFormSubmit}
          >
            <div className="">
              <textarea
                name="todoText"
                value={todoText}
                className=""
                style={{ lineHeight: '1.5', resize: 'vertical', color: 'black' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="">
              <button className="" type="submit">
                Add todo
              </button>
            </div>
            {error && (
              <div className="">
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