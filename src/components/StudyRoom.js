import React, { useState, useEffect } from "react";

function StudyRoom() {
  const [roomName, setRoomName] = useState("");
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studyRooms")) || [];
    setRooms(stored);
  }, []);

  const createRoom = () => {
    if (roomName.trim() === "") return;
    const newRoom = { name: roomName };
    const updatedRooms = [...rooms, newRoom];
    setRooms(updatedRooms);
    localStorage.setItem("studyRooms", JSON.stringify(updatedRooms));
    setRoomName("");
  };

  return (
    <div className="bg-white dark:bg-[#111] rounded-xl p-6 shadow-lg">
      <h2 className="text-2xl font-bold text-purple-500 dark:text-purple-300 mb-4">
        Create or Join a Study Room
      </h2>

      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Enter room name"
        className="w-full p-2 rounded bg-gray-100 dark:bg-gray-800 text-black dark:text-white mb-3"
      />

      <button
        onClick={createRoom}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition"
      >
        Create Room
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Your Rooms
        </h3>
        {rooms.length === 0 ? (
          <p className="text-sm text-gray-500">No rooms yet</p>
        ) : (
          <ul className="space-y-1">
            {rooms.map((r, i) => (
              <li key={i} className="text-black dark:text-white">📺 {r.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default StudyRoom;
