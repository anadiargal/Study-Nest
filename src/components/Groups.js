import React, { useState } from "react";

function Groups() {
  const [myGroups, setMyGroups] = useState(["Study Together 📘", "Coding 👨‍💻"]);
  const [groupName, setGroupName] = useState("");
  const [featuredGroups, setFeaturedGroups] = useState([
    {
      name: "Study Date",
      members: 3812,
      message: "I want a serious girl for study date. Anyone interested DM me!",
    },
    {
      name: "NEET 2025",
      members: 3478,
      message: "Any droppers here?",
    },
    {
      name: "Medicine Group",
      members: 2078,
      message: "Discuss the latest developments and medical issues.",
    },
  ]);

  const handleCreateGroup = () => {
    if (groupName.trim() !== "") {
      setMyGroups([...myGroups, groupName]);
      setGroupName("");
    }
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-white text-black dark:bg-[#0f0f10] dark:text-white transition-colors duration-300">
      <h1 className="text-3xl font-bold text-purple-500 mb-6">Groups</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* My Groups */}
        <div className="w-full md:w-1/4 bg-[#1c1c1e] p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">My groups</h2>
          <ul className="space-y-2">
            {myGroups.map((group, i) => (
              <li
                key={i}
                className="bg-gray-800 px-3 py-1 rounded text-sm text-white"
              >
                {group}
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="New group name"
              className="w-full p-2 rounded bg-gray-700 text-white mb-2"
            />
            <button
              onClick={handleCreateGroup}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded"
            >
              Create Group
            </button>
          </div>
        </div>

        {/* Featured Groups */}
        <div className="w-full md:w-3/4">
          <h2 className="text-lg font-semibold mb-4">Featured Groups</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredGroups.map((group, i) => (
              <div
                key={i}
                className="bg-[#1c1c1e] p-4 rounded-xl shadow-lg text-white"
              >
                <h3 className="text-xl font-bold mb-1">{group.name}</h3>
                <p className="text-sm text-gray-400 mb-2">
                  {group.members} members
                </p>
                <p className="text-sm mb-4">{group.message}</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Groups;
