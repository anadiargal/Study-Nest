// import React, { useState, useEffect } from "react";

// function GoalTracker() {
//   const [goal, setGoal] = useState("");
//   const [progress, setProgress] = useState(0);
//   const [goalDate, setGoalDate] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [inputGoal, setInputGoal] = useState("");

//   useEffect(() => {
//     const savedGoal = localStorage.getItem("weeklyGoal") || "";
//     const savedProgress = parseInt(localStorage.getItem("weeklyProgress")) || 0;
//     const savedDate = localStorage.getItem("goalDate") || "";

//     setGoal(savedGoal);
//     setProgress(savedProgress);
//     setGoalDate(savedDate);
//     setInputGoal(savedGoal);
//   }, []);

//   const saveGoal = () => {
//     setGoal(inputGoal);
//     setGoalDate(new Date().toLocaleDateString());
//     localStorage.setItem("weeklyGoal", inputGoal);
//     localStorage.setItem("goalDate", new Date().toLocaleDateString());
//     setEditMode(false);
//   };

//   const incrementProgress = () => {
//     const newProgress = progress + 1;
//     setProgress(newProgress);
//     localStorage.setItem("weeklyProgress", newProgress);
//   };

//   const resetGoal = () => {
//     setGoal("");
//     setProgress(0);
//     setGoalDate("");
//     localStorage.removeItem("weeklyGoal");
//     localStorage.removeItem("weeklyProgress");
//     localStorage.removeItem("goalDate");
//   };

//   const percentage = goal && parseInt(goal) > 0 ? Math.min(100, Math.round((progress / parseInt(goal)) * 100)) : 0;

//   return (
//     <div className="max-w-md mx-auto p-4 text-white">
//       <h2 className="text-2xl font-bold text-pink-300 mb-4">🎯 Weekly Goal Tracker</h2>

//       {!goal || editMode ? (
//         <div className="mb-4">
//           <input
//             type="text"
//             className="w-full p-2 text-black rounded-md"
//             placeholder="Set a weekly goal (e.g. 10)"
//             value={inputGoal}
//             onChange={(e) => setInputGoal(e.target.value)}
//           />
//           <button
//             onClick={saveGoal}
//             className="mt-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
//           >
//             Save Goal
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-2 mb-4">
//           <p><strong>Goal:</strong> {goal} hours</p>
//           <p><strong>Progress:</strong> {progress} / {goal} hours</p>
//           <p className="text-sm text-gray-400">Set on: {goalDate}</p>

//           <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden mt-2">
//             <div
//               className="bg-pink-400 h-full transition-all"
//               style={{ width: `${percentage}%` }}
//             ></div>
//           </div>

//           {percentage >= 100 && (
//             <p className="text-green-400 font-semibold mt-2">✅ Goal Completed! Great job!</p>
//           )}

//           <div className="flex gap-2 mt-3">
//             <button
//               onClick={incrementProgress}
//               className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
//             >
//               +1 hour
//             </button>
//             <button
//               onClick={() => setEditMode(true)}
//               className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded-md"
//             >
//               Edit Goal
//             </button>
//             <button
//               onClick={resetGoal}
//               className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
//             >
//               Reset
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default GoalTracker;

import React, { useEffect, useState } from "react";

function GoalTracker() {
  const [weeklyGoal, setWeeklyGoal] = useState("");
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const [subjectPlans, setSubjectPlans] = useState([]);
  const [subjectInput, setSubjectInput] = useState("");
  const [hoursInput, setHoursInput] = useState("");
  const [dateInput, setDateInput] = useState("");

  useEffect(() => {
    const storedGoal = localStorage.getItem("weeklyGoal") || "";
    const storedProgress = localStorage.getItem("weeklyProgress") || 0;
    const storedPlans = JSON.parse(localStorage.getItem("studyPlans")) || [];

    setWeeklyGoal(storedGoal);
    setWeeklyProgress(parseInt(storedProgress));
    setSubjectPlans(storedPlans);
  }, []);

  const handleWeeklyGoalSave = () => {
    localStorage.setItem("weeklyGoal", weeklyGoal);
    setWeeklyGoal(weeklyGoal);
  };

  const handleAddPlan = () => {
    if (subjectInput && hoursInput && dateInput) {
      const newPlan = {
        subject: subjectInput,
        hours: parseFloat(hoursInput),
        date: dateInput,
        completed: 0,
      };
      const updatedPlans = [...subjectPlans, newPlan];
      setSubjectPlans(updatedPlans);
      localStorage.setItem("studyPlans", JSON.stringify(updatedPlans));
      setSubjectInput("");
      setHoursInput("");
      setDateInput("");
    }
  };

  const handleComplete = (index) => {
    const updatedPlans = [...subjectPlans];
    if (updatedPlans[index].completed < updatedPlans[index].hours) {
      updatedPlans[index].completed += 0.5; // Simulating 30min completed
      setWeeklyProgress((prev) => {
        const updated = prev + 0.5;
        localStorage.setItem("weeklyProgress", updated);
        return updated;
      });
    }
    localStorage.setItem("studyPlans", JSON.stringify(updatedPlans));
    setSubjectPlans(updatedPlans);
  };

  const today = new Date().toISOString().split("T")[0];
  const todayPlans = subjectPlans.filter((plan) => plan.date === today);

  return (
    <div className="max-w-3xl mx-auto p-4 text-white">
      <h2 className="text-2xl font-bold text-pink-400 mb-4">🎯 Weekly Goal</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          placeholder="Set weekly goal in hours"
          value={weeklyGoal}
          onChange={(e) => setWeeklyGoal(e.target.value)}
          className="p-2 rounded text-black w-60"
        />
        <button
          onClick={handleWeeklyGoalSave}
          className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded"
        >
          Save Goal
        </button>
      </div>

      {weeklyGoal && (
        <p className="text-sm mb-6 text-gray-300">
          Progress: {weeklyProgress} / {weeklyGoal} hours
        </p>
      )}

      <h2 className="text-2xl font-bold text-purple-400 mb-4">🗓️ Study Planner</h2>
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Subject"
          value={subjectInput}
          onChange={(e) => setSubjectInput(e.target.value)}
          className="p-2 rounded text-black flex-1"
        />
        <input
          type="number"
          placeholder="Hours"
          value={hoursInput}
          onChange={(e) => setHoursInput(e.target.value)}
          className="p-2 rounded text-black w-24"
        />
        <input
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          className="p-2 rounded text-black w-40"
        />
        <button
          onClick={handleAddPlan}
          className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded"
        >
          Add Plan
        </button>
      </div>

      {todayPlans.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-purple-300 mb-2">
            🔔 Today's Study Plan
          </h3>
          <ul className="space-y-2">
            {todayPlans.map((plan, index) => (
              <li
                key={index}
                className="bg-[#1c1c1e] p-3 rounded-md flex justify-between items-center"
              >
                <div>
                  <p>{plan.subject} — {plan.completed}/{plan.hours} hrs</p>
                  {plan.completed < plan.hours && (
                    <p className="text-sm text-yellow-400">
                      ⏰ {plan.hours - plan.completed} hrs left for today
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleComplete(index)}
                  className="text-sm bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                >
                  +30min
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-400 mt-6">No plans for today.</p>
      )}
    </div>
  );
}

export default GoalTracker;

//add the api and the server to the 
// request and client and correct the solo 
// with the api in to the json 
//goal tracker -
