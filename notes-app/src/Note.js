// Note.js
import React from 'react';

const Note = ({ note, onSave, onDelete }) => {
  const [text, setText] = React.useState(note.text);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSave = () => {
    onSave({ ...note, text });
  };

  return (
    <div className="note">
      <textarea value={text} onChange={handleChange} maxLength={500} />
      <button onClick={handleSave}>Save</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Note;

