// import React from "react";
// import Navbar from "./Navbar";
// import { Link } from "react-router-dom";

// function HomePage() {
//   return (
//     <div className="bg-[#0f172a] text-white min-h-screen">
//       {/* <Navbar /> */}

//       <div className="max-w-6xl mx-auto px-6 py-16">
//         <section className="text-center mb-16">
//           <h2 className="text-4xl sm:text-5xl font-extrabold text-purple-400 mb-4">
//             Welcome to StudyNest
//           </h2>
//           <p className="text-lg text-gray-300 max-w-2xl mx-auto">
//             Your personalized productivity platform – manage tasks, stay focused with a timer, jot down notes, and track your progress all in one place.
//           </p>
//         </section>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
//           {/* Task Manager Card */}
//           <Link to="/tasks" className="bg-gray-800 hover:bg-gray-700 transition p-8 rounded-xl shadow-md">
//             <h3 className="text-2xl font-semibold mb-2 text-purple-300">📋 Tasks</h3>
//             <p className="text-gray-400">Add, complete, and track your daily tasks with deadlines and filters.</p>
//           </Link>

//           {/* Focus Timer Card */}
//           <Link to="/timer" className="bg-gray-800 hover:bg-gray-700 transition p-8 rounded-xl shadow-md">
//             <h3 className="text-2xl font-semibold mb-2 text-green-300">⏱️ Focus Timer</h3>
//             <p className="text-gray-400">Stay productive using a Pomodoro-style timer and track your daily focus time.</p>
//           </Link>

//           {/* Notes Card */}
//           <Link to="/notes" className="bg-gray-800 hover:bg-gray-700 transition p-8 rounded-xl shadow-md">
//             <h3 className="text-2xl font-semibold mb-2 text-yellow-300">📝 Notes</h3>
//             <p className="text-gray-400">Quickly jot down study ideas, thoughts, or reminders and save them locally.</p>
//           </Link>
//         </div>

//         {/* Motivation Quote */}
//         <div className="mt-16 text-center">
//           <blockquote className="text-xl italic text-purple-200 border-l-4 border-purple-400 pl-4">
//             “Success is the sum of small efforts, repeated day in and day out.”
//           </blockquote>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HomePage;

import React, { useEffect, useState } from "react";

function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [focusTime, setFocusTime] = useState(0);
  const [studyMates, setStudyMates] = useState([]);
  const [goals, setGoals] = useState([]);
  const [groups, setGroups] = useState([]);
  const [studyRooms, setStudyRooms] = useState([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")) || []);
    setNotes(JSON.parse(localStorage.getItem("notes")) || []);
    setFocusTime(JSON.parse(localStorage.getItem("focusTime")) || 0);
    setStudyMates(JSON.parse(localStorage.getItem("studyMates")) || []);
    setGoals(JSON.parse(localStorage.getItem("goals")) || []);
    setGroups(JSON.parse(localStorage.getItem("groups")) || []);
    setStudyRooms(JSON.parse(localStorage.getItem("studyRooms")) || []);
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 bg-white text-black dark:bg-[#0f0f10] dark:text-white transition-colors duration-300">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-purple-600 dark:text-purple-400 mb-6">
        Welcome to StudyNest
      </h1>

      <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
        Your personalized productivity platform – manage tasks, stay focused with a timer, jot down notes, and track your progress.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {/* Cards (no animation) */}
        {/* Tasks */}
        <div className="bg-gray-100 dark:bg-[#1c1c1e] p-6 rounded-2xl transition-transform shadow-md shadow-purple-800/10">
          <h2 className="text-purple-500 dark:text-purple-300 text-2xl font-semibold mb-2">📋 Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Add, complete, and track your daily tasks with deadlines and filters.
            </p>
          ) : (
            <ul className="text-sm space-y-1">
              {tasks.slice(0, 3).map((task, index) => (
                <li key={index} className="text-black dark:text-white">🔹 {task.text}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Focus */}
        <div className="bg-gray-100 dark:bg-[#1c1c1e] p-6 rounded-2xl transition-transform shadow-md shadow-green-800/10">
          <h2 className="text-green-500 dark:text-green-300 text-2xl font-semibold mb-2">⏳ Focus Timer</h2>
          {focusTime === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Stay productive using a Pomodoro-style timer and track your daily focus time.
            </p>
          ) : (
            <p className="text-black dark:text-white text-sm mt-2">
              Today's Focus: <strong>{focusTime} min</strong>
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="bg-gray-100 dark:bg-[#1c1c1e] p-6 rounded-2xl transition-transform shadow-md shadow-yellow-800/10">
          <h2 className="text-yellow-500 dark:text-yellow-300 text-2xl font-semibold mb-2">📝 Notes</h2>
          {notes.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Quickly jot down study ideas, thoughts, or reminders and save them locally.
            </p>
          ) : (
            <p className="text-black dark:text-white text-sm mt-2">
              🗒️ “{notes[notes.length - 1].text.slice(0, 40)}...”
            </p>
          )}
        </div>

        {/* Study Mates */}
        <div className="bg-gray-100 dark:bg-[#1c1c1e] p-6 rounded-2xl transition-transform shadow-md shadow-blue-800/10">
          <h2 className="text-blue-500 dark:text-blue-300 text-2xl font-semibold mb-2">👥 Study Mates</h2>
          {localStorage.getItem("studyMatePost") ? (
            <p className="text-black dark:text-white text-sm">{localStorage.getItem("studyMatePost")}</p>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                Connect with peers who are also studying and find your perfect study partner.
              </p>
              <p className="text-sm text-gray-500">Post your study needs and discover new buddies!</p>
            </>
          )}
        </div>

        {/* Goals */}
        <div className="bg-gray-100 dark:bg-[#1c1c1e] p-6 rounded-2xl transition-transform shadow-md shadow-pink-800/10">
          <h2 className="text-pink-500 dark:text-pink-300 text-2xl font-semibold mb-2">🎯 Goal Tracker</h2>
          {localStorage.getItem("weeklyGoal") ? (
            <p className="text-black dark:text-white text-sm">Goal: {localStorage.getItem("weeklyGoal")} hours</p>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                Set your weekly study goals and track your progress in one place.
              </p>
              <p className="text-sm text-gray-500">Stay consistent and celebrate your wins!</p>
            </>
          )}
        </div>

        {/* Study Rooms */}
        <div className="bg-gray-100 dark:bg-[#1c1c1e] p-6 rounded-2xl transition-transform shadow-md shadow-sky-800/10">
          <h2 className="text-sky-500 dark:text-sky-300 text-2xl font-semibold mb-2">📺 Study Rooms</h2>
          {studyRooms.length === 0 ? (
            <>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                Create or join a virtual study room to study together with friends!
              </p>
              <p className="text-sm text-gray-500">Stay motivated, live.</p>
            </>
          ) : (
            <ul className="text-sm space-y-1 mt-2">
              {studyRooms.slice(0, 2).map((room, index) => (
                <li key={index} className="text-black dark:text-white">🧑‍💻 Room: {room.name}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Groups */}
        <div className="bg-gray-100 dark:bg-[#1c1c1e] p-6 rounded-2xl transition-transform shadow-md shadow-indigo-800/10">
          <h2 className="text-indigo-500 dark:text-indigo-300 text-2xl font-semibold mb-2">💬 Groups</h2>
          {groups.length === 0 ? (
            <>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                Join or create your own study group to stay connected.
              </p>
              <p className="text-sm text-gray-500">Collaborate, chat, and grow together!</p>
            </>
          ) : (
            <ul className="text-sm space-y-1 mt-2">
              {groups.slice(0, 2).map((group, index) => (
                <li key={index} className="text-black dark:text-white">🔸 {group.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Motivational quote */}
      {!(tasks.length > 0 && notes.length > 0 && focusTime > 0) && (
        <p className="mt-10 italic text-center text-gray-500 dark:text-gray-400 text-sm">
          "Success is the sum of small efforts, repeated day in and day out."
        </p>
      )}
    </div>
  );
}

export default HomePage;

