import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import TaskManager from "./components/TaskManager";
import Notes from "./components/Notes";
import FocusTimer from "./components/FocusTimer";
import StudyMates from "./components/StudyMates";
import GoalTracker from "./components/GoalTracker";
import Groups from "./components/Groups";
import Notifications from "./components/Notifications";
import StudyRoom from "./components/StudyRoom";
import Messages from "./components/Messages";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
    document.documentElement.classList.add(storedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Router>
      <div className="min-h-screen font-sans bg-white text-black dark:bg-[#0f172a] dark:text-white transition-colors duration-300">
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/tasks"
            element={
              <div className="max-w-6xl mx-auto px-4 py-8">
                <TaskManager />
              </div>
            }
          />
          <Route
            path="/notes"
            element={
              <div className="max-w-3xl mx-auto px-4 py-8">
                <Notes />
              </div>
            }
          />
          <Route
            path="/timer"
            element={
              <div className="max-w-md mx-auto px-4 py-8">
                <FocusTimer />
              </div>
            }
          />
          <Route
            path="/study-mates"
            element={
              <div className="max-w-4xl mx-auto px-4 py-8">
                <StudyMates />
              </div>
            }
          />

          <Route
            path="/goal-tracker"
            element={
              <div className="max-w-4xl mx-auto px-4 py-8">
                <GoalTracker />
              </div>
            }
          />
          <Route
            path="/groups"
            element={
              <div className="max-w-4xl mx-auto px-4 py-8">
                <Groups />
              </div>
            }
          />
          <Route
            path="/study-room"
            element={<div className="max-w-3xl mx-auto px-4 py-8">
              <StudyRoom />
              </div>
            }
          />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/messages" element={<Messages />} />

          <Route path="/login" element={<Login />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
