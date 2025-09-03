import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Fetch Notes from Backend
  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:5000/api/notes');
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add Note
  const addNote = async () => {
    if (!title || !content) return alert('Please fill all fields!');
    await axios.post('http://localhost:5000/api/notes', { title, content });
    setTitle('');
    setContent('');
    fetchNotes(); // Refresh notes
  };

  // Delete Note
  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    fetchNotes();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>🧠 Second Brain App</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <br />
      <button onClick={addNote}>Add Note</button>

      <h2>My Notes:</h2>
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <strong>{note.title}:</strong> {note.content}
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
