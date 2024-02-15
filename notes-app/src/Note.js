// Note.js
import React from 'react';
import './Note.css'; // Import the CSS file`

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
      <button class="btn_save" onClick={handleSave}>Save</button>
      <button class="btn_delete" onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Note;

