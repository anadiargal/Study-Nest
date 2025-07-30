import React, { useEffect, useState, useRef } from "react";

const quotes = [
  "Focus on being productive instead of busy.",
  "Your future is created by what you do today, not tomorrow.",
  "Small steps every day lead to big results.",
  "Discipline is doing it even when you don’t feel like it.",
  "Don’t watch the clock. Do what it does — keep going.",
  "Productivity is never an accident. It is always the result of focus and effort."
];

function TaskManager() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [quote, setQuote] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = () => {
    if (newTask.trim() === "") return;

    const task = {
      id: Date.now(),
      text: newTask,
      due: newDate,
      completed: false,
    };

    setTasks([task, ...tasks]);
    setNewTask("");
    setNewDate("");
  };

  const toggleComplete = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
  };

  const handleDelete = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    
    <div className="bg-[#1f2937] p-6 rounded-xl shadow-md max-w-xl mx-auto mt-10 text-white font-sans">
      {/* 🧠 Productivity Quote */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-500 p-4 rounded-lg shadow-md mb-6 transition-all duration-500">
        <p className="text-sm sm:text-base font-medium text-white text-center italic">“{quote}”</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-purple-400">📋 Your Tasks</h2>

      {/* Inputs */}
      <div className="flex gap-2 mb-4 flex-col sm:flex-row">
        <input
          ref={inputRef}
          type="text"
          className="flex-grow px-3 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
        />

        <input
          type="date"
          className="px-3 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-400"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />

        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-2 rounded text-white font-semibold shadow hover:shadow-lg hover:scale-105 transition-all"
        >
          Add
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-3 mb-6">
        {["all", "completed", "incomplete"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === type
                ? "bg-purple-600 text-white shadow"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Task List */}
      <ul className="space-y-3">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-400 text-center">No tasks to show.</p>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className="bg-gray-700 p-4 rounded-lg flex justify-between items-center shadow-md hover:scale-[1.01] transition-all"
            >
              <div className="flex items-start flex-col sm:flex-row sm:items-center gap-2 w-full">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                  />
                  <span
                    className={`$${
                      task.completed ? "line-through text-gray-400" : "text-white"
                    }`}
                  >
                    {task.text}
                  </span>
                </div>
                {task.due && (
                  <span className="text-sm text-gray-400 sm:ml-auto">
                    ⏰ {task.due}
                  </span>
                )}
              </div>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-sm text-red-400 hover:text-red-500 ml-2"
              >
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TaskManager;





