import React from 'react';
import { useQuery } from "apollo/client";

const todoForm = () => {
  const []
}


const Home = () => {
  const { loading, data } = useQuery(QUERY_TODOS);
  const todos = data?.todos || [];

  return (
    <div>
      <h3>Todo's</h3>

    </div>
  );
};

export default Home;