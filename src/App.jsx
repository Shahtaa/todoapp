// src/App.jsx

import { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'john_doe', password: 'password123' },
    { id: 2, username: 'jane_doe', password: 'password456' },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, user_id: 1, title: 'Buy groceries', is_completed: false },
    { id: 2, user_id: 2, title: 'Read a book', is_completed: true },
  ]);

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', user_id: 1 });
  const [newUser, setNewUser] = useState({ username: '', password: '' });

  const handleAddTask = () => {
    const newId = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    const taskToAdd = {
      id: newId,
      user_id: Number(newTask.user_id),
      title: newTask.title,
      is_completed: false,
    };
    setTasks([...tasks, taskToAdd]);
    setShowTaskModal(false);
    setNewTask({ title: '', user_id: 1 });
  };

  const handleAddUser = () => {
    const newId = users.length ? users[users.length - 1].id + 1 : 1;
    const userToAdd = {
      id: newId,
      username: newUser.username,
      password: newUser.password,
    };
    setUsers([...users, userToAdd]);
    setShowUserModal(false);
    setNewUser({ username: '', password: '' });
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, is_completed: !task.is_completed } : task
    ));
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">User Tasks</h1>

      <Button variant="primary" onClick={() => setShowUserModal(true)} className="mb-3">
        Add User
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    setNewTask({ ...newTask, user_id: user.id });
                    setShowTaskModal(true);
                  }}
                >
                  Add Task
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className="mt-4">Tasks</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Assigned User</th>
            <th>Title</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const assignedUser = users.find(user => user.id === task.user_id);
            return (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{assignedUser ? assignedUser.username : 'Unknown'}</td>
                <td>{task.title}</td>
                <td>{task.is_completed ? 'Yes' : 'No'}</td>
                <td>
                  <Button variant="success" onClick={() => toggleTaskCompletion(task.id)}>
                    Mark as {task.is_completed ? 'Incomplete' : 'Completed'}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* Modal for adding a new task */}
      <Modal show={showTaskModal} onHide={() => setShowTaskModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="taskTitle">
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="userSelect">
              <Form.Label>Assign to User</Form.Label>
              <Form.Control
                as="select"
                value={newTask.user_id}
                onChange={(e) =>
                  setNewTask({ ...newTask, user_id: e.target.value })
                }
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTaskModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddTask}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for adding a new user */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                autoComplete="username" // Added autocomplete
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                autoComplete="current-password" // Added autocomplete
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUserModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default App;
