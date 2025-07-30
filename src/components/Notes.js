import React, { useState, useEffect } from "react";

function Notes() {
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (noteText.trim() === "") return;

    const newNote = {
      id: Date.now(),
      text: noteText,
    };

    setNotes([newNote, ...notes]);
    setNoteText("");
  };

  const deleteNote = (id) => {
    const filtered = notes.filter((note) => note.id !== id);
    setNotes(filtered);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md mt-10 text-white">
      <h2 className="text-xl font-semibold mb-4 text-yellow-400">📝 Notes</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-grow px-3 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Write something..."
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addNote()}
        />
        <button
          onClick={addNote}
          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-white font-semibold"
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {notes.length === 0 ? (
          <p className="text-gray-400 text-sm">No notes yet.</p>
        ) : (
          notes.map((note) => (
            <li
              key={note.id}
              className="bg-gray-700 p-3 rounded-lg flex justify-between items-center"
            >
              <span>{note.text}</span>
              <button
                onClick={() => deleteNote(note.id)}
                className="text-red-400 hover:text-red-500 text-sm"
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

export default Notes;
