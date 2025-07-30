import React, { useEffect, useState } from "react";

function Leaderboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const log = JSON.parse(localStorage.getItem("focusLog") || "{}");

    const entries = Object.entries(log)
      .map(([date, seconds]) => ({
        date,
        minutes: Math.floor(seconds / 60),
      }))
      .sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split("/").map(Number);
        const [dayB, monthB, yearB] = b.date.split("/").map(Number);
        return new Date(yearB, monthB - 1, dayB) - new Date(yearA, monthA - 1, dayA);
      })
      .slice(0, 7); // Show only latest 7 days

    setData(entries);
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md w-full mt-6 text-white">
      <h2 className="text-xl font-semibold text-yellow-400 mb-4">🏆 Weekly Focus Leaderboard</h2>
      {data.length === 0 ? (
        <p className="text-gray-400">No focus data yet.</p>
      ) : (
        <ul className="space-y-2">
          {data.map((entry) => (
            <li key={entry.date} className="flex justify-between border-b border-gray-600 pb-1">
              <span>{entry.date}</span>
              <span className="font-bold text-teal-300">{entry.minutes} mins</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Leaderboard;
