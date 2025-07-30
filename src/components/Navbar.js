import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MoonIcon,
  SunIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
} from "@heroicons/react/24/solid";

function Navbar() {
  const navigate = useNavigate();

  // Get saved theme from localStorage or default to dark
  const getInitialTheme = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "light" ? false : true;
    }
    return true;
  };

  const [darkMode, setDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="bg-gray-900 dark:bg-gray-950 shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50 transition-all duration-300">
      {/* Left: Logo */}
      <h1
        className="text-2xl sm:text-3xl font-bold text-purple-400 cursor-pointer"
        onClick={() => navigate("/")}
      >
        StudyNest
      </h1>

      {/* Middle: Navigation Links */}
      <ul className="hidden sm:flex gap-6 text-sm font-medium text-gray-300">
        {[
          "/",
          "/tasks",
          "/notes",
          "/timer",
          "/study-mates",
          "/goal-tracker",
          "/groups",
          "/study-room",
        ].map((path, index) => {
          const names = [
            "Home",
            "Tasks",
            "Notes",
            "Focus",
            "Study Mates",
            "Goal Tracker",
            "Groups",
            "Study Room",
          ];

          return (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? "text-white font-semibold" : "hover:text-white"
                }
              >
                {names[index]}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {/* Right: Theme Toggle + Avatar */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-gray-300 hover:text-white transition"
          title="Toggle Theme"
        >
          {darkMode ? (
            <SunIcon className="h-5 w-5 text-yellow-300" />
          ) : (
            <MoonIcon className="h-5 w-5 text-blue-500" />
          )}
        </button>
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/notifications")}
        >
          <BellIcon className="h-5 w-5 text-purple-400 hover:text-purple-500" />
          {/* Optional red dot if there are new notifications */}
          {/* <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span> */}
        </div>
        {/* Message Icon */}
        <div
          onClick={() => navigate("/messages")}
          className="cursor-pointer p-2 rounded-full hover:bg-gray-800 transition"
          title="Messages"
        >
          <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-300 hover:text-white" />
        </div>

        <div
          onClick={() => navigate("/login")}
          className="w-9 h-9 p-1 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center cursor-pointer transition duration-300"
          title="Login"
        >
          <UserIcon className="h-5 w-5 text-black" />
        </div>
        
      </div>
    </nav>
  );
}

export default Navbar;
