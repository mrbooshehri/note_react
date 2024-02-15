// NotesApp.js
import React from 'react';
import Note from './Note';
import './NotesApp.css'; // Import the CSS file`

const NotesApp = () => {
  const [notes, setNotes] = React.useState(() => {
    // Load notes from local storage or initialize empty array
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addNote = () => {
    const newNote = { id: Date.now(), text: '' };
    setNotes([...notes, newNote]);
  };

  const updateNote = (updatedNote) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const saveNotes = React.useCallback(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  React.useEffect(() => {
    saveNotes();
  }, [saveNotes]);

  return (
    <div className="notes-app">
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredNotes.map((note) => (
        <Note key={note.id} note={note} onSave={updateNote} onDelete={() => deleteNote(note.id)} />
      ))}
      <button onClick={addNote}>Add Note</button>
    </div>
  );
};

export default NotesApp;

