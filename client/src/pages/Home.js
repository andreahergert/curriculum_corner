import React from 'react';

import { useQuery } from '@apollo/client';

import Todos from '../components/Todos';
import TodoForm from '../components/TodoForm';

import { QUERY_TODOS } from '../utils/queries';


const Home = () => {
  const { loading, data } = useQuery(QUERY_TODOS);
  //TODO: 
  const todos = data?.todos || [];

  return (
    <main>
      <div className="">
        <div className="">
          <TodoForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Todos
              todos={todos}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;