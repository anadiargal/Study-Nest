import React, { useEffect, useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const storedGoals = JSON.parse(localStorage.getItem("goals")) || [];
    const storedFocus = JSON.parse(localStorage.getItem("focusTime")) || 0;

    const newNotifications = [];

    // Task reminders
    storedTasks.forEach((task) => {
      if (!task.completed) {
        newNotifications.push({ type: "Task", message: `Incomplete task: "${task.text}"` });
      }
    });

    // Goal reminders
    storedGoals.forEach((goal) => {
      if (!goal.completed) {
        newNotifications.push({ type: "Goal", message: `Goal pending: "${goal.text}"` });
      }
    });

    // Focus reminder
    if (storedFocus < 30) {
      newNotifications.push({ type: "Focus", message: "You haven't focused much today!" });
    }

    setNotifications(newNotifications);
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 text-white">
      <h2 className="text-3xl font-bold mb-6 text-purple-400">🔔 Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-400">You're all caught up. No reminders right now!</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note, index) => (
            <li
              key={index}
              className="bg-gray-800 dark:bg-[#1c1c1e] p-4 rounded-lg shadow shadow-purple-800/10"
            >
              <p className="font-semibold">{note.type}</p>
              <p className="text-gray-400 text-sm">{note.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;
