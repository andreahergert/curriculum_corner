import React from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';

import Todos from '../components/Todos';
import TodoForm from '../components/TodoForm';

import { QUERY_TODOS } from '../utils/queries';
import { REMOVE_TODO } from '../utils/mutations';


const Home = () => {
  const { loading, data } = useQuery(QUERY_TODOS,
    {variables: { username: Auth.getProfile().data.username }});
  const todos = data?.todos || [];

const [removeTodo] = useMutation(REMOVE_TODO);

const handleRemoveTodo = (id) => {
  removeTodo({ variables: { todoId: id } });
};

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md mb-3 p-3">
          <TodoForm />
        </div>
        <div className="col-12 col-md-10 mb-3 p-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Todos
              todos={todos}
              handleRemoveTodo={handleRemoveTodo}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;