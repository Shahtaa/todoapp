import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todo items:', error);
      });
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:3001/todos', {
          title: inputValue,
          completed: false
        });
        setTodos([...todos, response.data]);
        setInputValue('');
      } catch (error) {
        console.error('Error adding todo item:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo item:', error);
    }
  };

  const handleComplete = async (id) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
      await axios.put(`http://localhost:3001/todos/${id}`, updatedTodo);
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error updating todo item:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter a new task"
          className="input"
        />
        <button type="submit" className="button">Add</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
            <div>
              <button onClick={() => handleComplete(todo.id)} className={`complete-button ${todo.completed ? 'undo' : ''}`}>
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => handleDelete(todo.id)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
