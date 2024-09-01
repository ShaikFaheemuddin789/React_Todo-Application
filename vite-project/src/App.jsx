// src/App.jsx

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './redux/todoSlice';
import { v4 as uuidv4 } from 'uuid';
import '../src/styles/app.css';

function App() {
  const [title, setTitle] = useState('');
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (title) {
      dispatch(addTodo({ id: uuidv4(), title, status: false }));
      setTitle('');
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo"
          className="input"
        />
        <button onClick={handleAddTodo} className="add-button">
          Add Todo
        </button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span
              className="todo-text"
              style={{
                textDecoration: todo.status ? 'line-through' : 'none',
                color: todo.status ? '#999' : '#333',
              }}
            >
              {todo.title}
            </span>
            <div className="buttons">
              <button
                onClick={() => dispatch(toggleTodo(todo.id))}
                className="toggle-button"
              >
                {todo.status ? 'Undo' : 'Complete'}
              </button>
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
