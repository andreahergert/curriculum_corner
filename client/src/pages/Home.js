import React from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

import Todos from '../components/Todos';
import TodoForm from '../components/TodoForm';

import { QUERY_TODOS } from '../utils/queries';
import { REMOVE_TODO, MARK_TODO_AS_COMPLETED } from '../utils/mutations';


const Home = () => {
  const { loading, data } = useQuery(QUERY_TODOS,
    {variables: { username: Auth.getProfile().data.username }});
  const todos = data?.todos || [];

const [removeTodo] = useMutation(REMOVE_TODO);
const [markTodoAsCompleted] = useMutation(MARK_TODO_AS_COMPLETED);

const handleRemoveTodo = (id) => {
  removeTodo({ variables: { todoId: id } });
};

const handleMarkTodoAsCompleted = (id) => {
  markTodoAsCompleted({ variables: { todoId: id } });
};

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md mb-5 p-3">
          <TodoForm />
        </div>
        <div className='centerTodos'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Todos
              todos={todos}
              handleRemoveTodo={handleRemoveTodo}
              handleMarkTodoAsCompleted={handleMarkTodoAsCompleted}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;