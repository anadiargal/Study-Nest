import React, { useState, useEffect } from "react";

function StudyMates() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("studyMates")) || [];
    setPosts(storedPosts);
  }, []);

  const handlePost = () => {
    if (input.trim()) {
      const updated = [
        ...posts,
        { text: input.trim(), time: new Date().toLocaleString() },
      ];
      setPosts(updated);
      localStorage.setItem("studyMates", JSON.stringify(updated));
      setInput("");
    }
  };

  const handleDelete = (indexToDelete) => {
    const updated = posts.filter((_, i) => i !== indexToDelete);
    setPosts(updated);
    localStorage.setItem("studyMates", JSON.stringify(updated));
  };

  return (
    <div className="max-w-3xl mx-auto p-4 text-white">
      <h2 className="text-2xl font-bold text-blue-300 mb-4">
        📣 Find a Study Mate
      </h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 rounded-md text-black"
          placeholder="Post what you're studying..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handlePost}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Post
        </button>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-400">
          No posts yet. Be the first to find a buddy!
        </p>
      ) : (
        <ul className="space-y-2">
          {posts.map((post, index) => (
            <li
              key={index}
              className="bg-[#1c1c1e] p-3 rounded-lg flex justify-between items-start"
            >
              <div>
                <p>{post.text}</p>
                <p className="text-sm text-gray-500">{post.time}</p>
              </div>
              <button
                className="text-red-500 text-lg ml-4"
                onClick={() => handleDelete(index)}
                title="Delete this post"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudyMates;

