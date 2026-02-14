"use client";

import { useState, useEffect } from "react";

type Note = {
  id: number;
  text: string;
};

export default function Home() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;

  // Save note
  const saveNote = async () => {
    if (!text.trim()) return;

    try {
      await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      setText("");
      fetchNotes();
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  // Fetch notes safely
  const fetchNotes = async () => {
    try {
      const res = await fetch(`${API_URL}/notes`);
      const data = await res.json();

      // ensure notes is always an array
      if (Array.isArray(data)) {
        setNotes(data);
      } else {
        setNotes([]);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      setNotes([]);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-gray-800">
          🔐 Secure Notes
        </h1>

        <p className="text-gray-500 mt-2">
          Notes are encrypted using AES-256-GCM in the backend before storage
          and displayed decrypted below.
        </p>

        {/* Input Section */}
        <div className="flex gap-3 mt-6">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your secret note..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={saveNote}
            className="bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Save
          </button>
        </div>

        {/* Notes Section */}
        <h2 className="text-xl font-semibold mt-8 text-gray-700">
          Decrypted Notes
        </h2>

        <div className="mt-4 space-y-3">
          {notes.length === 0 && (
            <p className="text-gray-400">No notes saved yet.</p>
          )}

          {notes.map((note) => (
            <div
              key={note.id}
              className="p-4 bg-gray-50 border rounded-lg shadow-sm"
            >
              <p className="text-gray-800">{note.text}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
