'use client';
import { useEffect, useState } from 'react';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';
import { MdAdd } from 'react-icons/md';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/Todo');
        const data = await response.json();
        setTodos(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await fetch('/api/Todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: newTodo,
          completed: false,
          createdAt: new Date()
        }),
      });
      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t._id === id);
      const response = await fetch(`/api/Todo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      
      if (response.ok) {
        setTodos(todos.map(todo =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        ));
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/Todo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        setTodos(todos.filter(todo => todo._id !== id));
      } else {
        const error = await response.json();
        console.error('Failed to delete todo:', error);
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleCheckbox = (id) => {
    setTodos(todos.map(todo => 
      todo._id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Todo List
          </h1>
          
          <form onSubmit={addTodo} className="mb-8 flex gap-3">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new todo..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-gray-700 placeholder-gray-400"
            />
            <button 
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl transition-all transform hover:scale-105 flex items-center gap-2 shadow-md"
            >
              <MdAdd className="text-xl" />
              <span>Add</span>
            </button>
          </form>

          <div className="space-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No todos yet. Add one above!</p>
                <p className="text-gray-400 text-sm mt-2">Your tasks will appear here</p>
              </div>
            ) : (
              todos.map((todo) => (
                <div 
                  key={todo._id} 
                  className="flex items-center justify-between bg-white p-4 rounded-xl border-2 border-gray-100 hover:border-blue-200 transition-colors shadow-sm"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleCheckbox(todo._id)}
                        className="peer h-5 w-5 cursor-pointer opacity-0 absolute"
                      />
                      <div className={`h-5 w-5 border-2 rounded-md transition-colors ${
                        todo.completed 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-transparent' 
                          : 'border-gray-300'
                      } flex items-center justify-center`}>
                        {todo.completed && <FaCheck className="text-white text-sm" />}
                      </div>
                    </div>
                    <span className={`flex-1 text-gray-700 transition-all ${
                      todo.completed 
                        ? 'line-through text-gray-400' 
                        : ''
                    }`}>
                      {todo.text}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="ml-4 text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              ))
            )}
          </div>

          {todos.length > 0 && (
            <div className="mt-6 text-center text-sm text-gray-500">
              {todos.filter(t => t.completed).length} of {todos.length} tasks completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
