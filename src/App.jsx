import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Fetch tasks on component mount
  

  // Add a new task
  const AddTask = () => {
    if (!newTask.trim()) return; // Prevent empty task submission

    axios
      .post('http://localhost:5000/save-todo', { text: newTask })
      .then((res) => {
        setTasks([...tasks, res.data]); // Update tasks with the new task
        setNewTask(''); // Clear input field
      })
      .catch((err) => {
        console.error('Error adding task:', err);
      });
  };

  // Delete a task
  const deleteTask = (id) => {
    axios
      .delete(`http://localhost:5000/delete-todo/${id}`)
      .then(() => {
        alert('Do You Want To Delete...');
      })
      .catch((err) => {
        console.error('Error deleting task:', err);
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/get-todo')
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error('Error fetching tasks:', err);
      });
  }, [AddTask,deleteTask]);


  return (
    <div className="container mx-auto mt-10 p-6 bg-gray-100 shadow-lg rounded-lg max-w-md">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">TODO APP</h1>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter your task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={AddTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          ADD TASK
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {tasks.map((task,id) => (
          <li
            key={id}
            className="bg-white p-3 rounded-lg shadow-sm text-gray-700 flex items-center justify-between"
          >
            <span>{task.text}</span>
            <button
              onClick={() => deleteTask(task._id)}
              className="text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
