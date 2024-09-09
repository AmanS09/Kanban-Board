import React, { useState, useEffect } from "react";
import TaskColumn from "./components/TaskColumn";
import CreateTaskForm from "./components/CreateTaskForm";
import image from "./assets/Board_Infinity.png";

const App = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const changeTaskStatus = (taskId, newStatus) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      const taskIndex = newTasks.findIndex((task) => task.id === taskId);
      if (taskIndex !== -1) {
        newTasks[taskIndex].status = newStatus;
      }
      return newTasks;
    });
  };

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <img
        src={image}
        alt="Board-Infinity"
        height={"75px"}
        width={"75px"}
      />
      <div className="max-w-7xl mx-auto mt-12">
      <header className="flex justify-between items-center mb-6 bg-white border border-gray-250 p-4">
          <h1 className="text-2xl font-bold">Desktop & Mobile Application</h1>
          <button
            className="bg-purple-600 text-white px-2 py-2 rounded-md flex items-center"
            onClick={() => setIsModalOpen(true)}
          >
            Create Task
          </button>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {["TODO", "IN PROGRESS", "COMPLETED"].map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
              onTaskUpdate={updateTask}
              onTaskDelete={deleteTask}
              onTaskStatusChange={changeTaskStatus}
              onTaskSelect={handleTaskSelect}
            />
          ))}
        </div>
        {isModalOpen && (
          <CreateTaskForm
            onClose={handleModalClose}
            onSave={addTask}
            task={selectedTask}
            onUpdate={updateTask}
          />
        )}
      </div>
    </div>
  );
};

export default App;
