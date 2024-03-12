import { useState, useEffect } from 'react'; // Import necessary hooks from React
import axios from 'axios'; // Import Axios for making HTTP requests
import './App.css'; // Import CSS file for styling

const App = () => {
  const [todos, setTodos] = useState([]); // State variable for storing todos
  const [inputValue, setInputValue] = useState(''); // State variable for input value

  useEffect(() => {
    // Effect hook to fetch todos when the component mounts
    axios.get('http://localhost:3001/todos') // Fetch todos from the server
      .then(response => {
        setTodos(response.data); // Update todos state with fetched data
      })
      .catch(error => {
        console.error('Error fetching todo items:', error); // Log error if fetching fails
      });
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const handleChange = (e) => {
    setInputValue(e.target.value); // Update input value as user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (inputValue.trim() !== '') { // Check if input value is not empty
      try {
        // Send POST request to add new todo
        const response = await axios.post('http://localhost:3001/todos', {
          title: inputValue, // New todo title
          completed: false // New todo is not completed initially
        });
        setTodos([...todos, response.data]); // Add new todo to todos array
        setInputValue(''); // Clear input value after adding todo
      } catch (error) {
        console.error('Error adding todo item:', error); // Log error if adding todo fails
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      // Send DELETE request to delete todo
      await axios.delete(`http://localhost:3001/todos/${id}`);
      // Remove deleted todo from todos array
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo item:', error); // Log error if deleting todo fails
    }
  };

  const handleComplete = async (id) => {
    try {
      // Find the todo to update
      const todoToUpdate = todos.find(todo => todo.id === id);
      // Toggle the completion status
      const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
      // Send PUT request to update todo
      await axios.put(`http://localhost:3001/todos/${id}`, updatedTodo);
      // Update todos array with updated todo
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error updating todo item:', error); // Log error if updating todo fails
    }
  };

  // JSX code for rendering the component
  return (
    <div className="container"> {/* Container for the todo list */}
      <h1 className="title">Todo List</h1> {/* Title of the todo list */}
      <form onSubmit={handleSubmit}> {/* Form for adding new todo */}
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter a new task"
          className="input" // Input field for entering new todo
        />
        <button type="submit" className="button">Add</button> {/* Button to add new todo */}
      </form>
      <ul className="todo-list"> {/* List to display todos */}
        {todos.map((todo) => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            {/* Individual todo item */}
            <span className={todo.completed ? 'completed' : ''}>{todo.title}</span> {/* Title of the todo */}
            <div>
              {/* Button to mark todo as complete or incomplete */}
              <button onClick={() => handleComplete(todo.id)} className={`complete-button ${todo.completed ? 'undo' : ''}`}>
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              {/* Button to delete todo */}
              <button onClick={() => handleDelete(todo.id)} className="delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App; // Export the component as the default export
