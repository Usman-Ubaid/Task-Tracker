import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddForm from './components/AddForm';
import Footer from './components/Footer';
import About from './components/About'



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

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
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
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', 
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json();

    setTasks([...tasks, data])
  }
  

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = {...taskToToggle,
    reminder: !taskToToggle.reminder};

    const res = await fetch(`http://localhost:5000/tasks/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updTask)
    });

    const data = res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? {...task, 
          reminder:data.reminder} 
          : task))
  }

  return (
      <div className="container">
        <Header title = 'Task Tracker' 
                onAddTask={() => setShowAddTask(!showAddTask)} 
                showAdd={showAddTask}/>

        
      <Routes>
        <Route path='/' element={
          <>
            {showAddTask && <AddForm onAdd={addTask} />}

            {tasks.length > 0 
            ? (<Tasks tasks={tasks} onDelete={deleteTask}
            onToggle={toggleReminder}/>) 
            : (
              'No Tasks to Show')}
          </>
          }  />
          
        <Route path='/about' element={<About />} />
      </Routes>
        <Footer />
      </div>
  );
}

export default App;
