import './App.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddForm from './components/AddForm';

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer)
    }

    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    return data;
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method: 'DELETE'
    });

    setTasks(tasks.filter((task) => task.id !== id))
  }
  
  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 1000) + 1;
    const newTask = {id, ...task };
    setTasks([...tasks, newTask])
  }
  

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? {...task, reminder:!task.reminder} 
          : task))
  }

  return (
    <div className="container">
      <Header title = 'Task Tracker' 
              onAddTask={() => setShowAddTask(!showAddTask)} 
              showAdd={showAddTask}/>

      {showAddTask && <AddForm onAdd={addTask} />}

      {tasks.length > 0 
      ? <Tasks tasks={tasks} onDelete={deleteTask}
      onToggle={toggleReminder}/> 
      : 'No Tasks to Show'}

    </div>
  );
}

export default App;
