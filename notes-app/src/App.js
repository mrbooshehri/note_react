// App.js
import React from 'react';
import NotesApp from './NotesApp'; // Import the NotesApp component
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>My Notes App</h1>
      <NotesApp /> {/* Render the NotesApp component */}
    </div>
  );
}

export default App;

