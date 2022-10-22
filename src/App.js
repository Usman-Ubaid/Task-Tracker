import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddForm from './components/AddForm';

function App() {
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Doctor\'s Appointment',
        day: '20th Oct at 11:30',
        reminder: true
    }, 
    {
        id: 2,
        text: 'Meeting at School',
        day: 'Oct 25th at 9:00',
        reminder: true
    },
    {
        id: 3,
        text: 'Food Shopping',
        day: 'Oct 28th at 16:00',
        reminder: false
    }
])

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
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
      <Header title = 'Task Tracker' />

      <AddForm />
      
      {tasks.length > 0 
      ? <Tasks tasks={tasks} onDelete={deleteTask}
      onToggle={toggleReminder}/> 
      : 'No Tasks to Show'}

    </div>
  );
}

export default App;
