import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";

import Todos from "../components/Todos";
import TodoForm from "../components/TodoForm";

import { QUERY_TODOS } from "../utils/queries";
import { REMOVE_TODO, MARK_TODO_AS_COMPLETED } from "../utils/mutations";

const Home = () => {
  const { loading, data } = useQuery(QUERY_TODOS, {
    variables: { username: Auth.getProfile().data.username },
  });
  const todos = data?.todos || [];
  const [completedTodos, setCompletedTodos] = useState([]);

  const [removeTodo] = useMutation(REMOVE_TODO);
  const [markTodoAsCompleted] = useMutation(MARK_TODO_AS_COMPLETED);

  const handleRemoveTodo = (id) => {
    removeTodo({
      variables: { todoId: id },
      update: (cache, { data }) => {
        const { todos } = cache.readQuery({ query: QUERY_TODOS });
        cache.writeQuery({
          query: QUERY_TODOS,
          data: { todos: todos.filter((todo) => todo._id !== id) },
        });
      },
    });
  };

  const handleMarkTodoAsCompleted = (id) => {
    markTodoAsCompleted({ variables: { todoId: id } });
    setCompletedTodos([...completedTodos, id]);
  };

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md mb-5 p-3">
          <TodoForm />
        </div>
        <div className="centerTodos">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Todos
              todos={todos}
              completedTodos={completedTodos}
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
