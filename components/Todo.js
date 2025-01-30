"use client";
import React, { useState, useEffect } from "react";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch todos from the database
  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/Todo", {
        method: "GET",
      });
      const data = await response.json();
      setTodos(data.data); // Assuming the response structure is { data: [...] }
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new todo to the database
  const addTodo = async () => {
    if (newTodo.trim()) {
      const requestBody = { text: newTodo, completed: false };
      console.log("Request Body Sent to API:", requestBody); // Debugging

      try {
        const response = await fetch("http://localhost:3000/api/Todo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody), // Ensure request body is properly formatted
        });

        const data = await response.json();
        console.log("Response from API:", data); // Debugging

        if (response.ok) {
          setTodos((prevTodos) => [...prevTodos, data.data]); // Update state with the new todo
          setNewTodo(""); // Clear the input field
        } else {
          console.error("Error from API:", data.message);
        }
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  // Toggle the completion status of a todo
  const toggleTodo = async (id, completed) => {
    try {
      const response = await fetch(`http://localhost:3000/api/Todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !completed }), // Toggle the completed status
      });

      const data = await response.json();
      if (response.ok) {
        // Update the state with the new completion status
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, completed: !completed } : todo
          )
        );
      } else {
        console.error("Error updating todo:", data.message);
      }
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  // Delete a todo from the database
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/Todo/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        // Remove the deleted todo from the state
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      } else {
        console.error("Error deleting todo:", data.message);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new todo"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li
              key={todo._id} // Use MongoDB's _id as the key
              className={`flex items-center justify-between p-3 border-b ${
                todo.completed ? "bg-green-50" : ""
              }`}
            >
              <span
                onClick={() => toggleTodo(todo._id, todo.completed)} // Toggle completion on click
                className={`flex-grow cursor-pointer ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>
              <div className="flex items-center">
                <button
                  onClick={() => deleteTodo(todo._id)} // Delete todo
                  className="text-red-500 hover:bg-red-100 p-1 rounded-full"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoApp;
