import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddForm from "./components/AddForm";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(true);
  const [tasks, setTasks] = useState([]);

  // Delete task
  const deleteTask = async (id) => {
    const deletedTask = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(deletedTask));
    setTasks(deletedTask);
  };

  // Add Task
  const addTask = (task) => {
    const id = uuidv4();
    const taskWithId = { ...task, id };

    const updatedTasks = [...tasks, taskWithId];

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    const tasksFromStorage = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(tasksFromStorage);
  }, []);

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, reminder: !task.reminder } : task
    );

    setTasks(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="container">
      <Header
        title="Task Tracker"
        onAddTask={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />

      <Routes>
        <Route
          path="/"
          element={
            <>
              {showAddTask && <AddForm onAdd={addTask} />}

              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "No Tasks to Show"
              )}
            </>
          }
        />

        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
