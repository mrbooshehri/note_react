# Notes App 

## Overview
Welcome to the Notes App! This is a simple yet powerful application built with React that allows you to manage your notes efficiently. With this app, you can create, edit, save, and delete notes, all within your browser without the need for any server-side setup.

## Features
- **Create and Edit Notes**: Quickly jot down thoughts, ideas, or tasks with our intuitive note creation interface.
- **Local Storage**: All your notes are saved directly in your browser's local storage, ensuring they persist across sessions and devices.
- **Search Functionality**: Easily find the notes you're looking for with our dynamic search feature.
- **Character Limit**: Each note has a character limit to help keep your notes concise and focused.

## Getting Started
To get started with the Notes App, follow these steps:

1. Clone the repository to your local machine using `git clone https://github.com/yourusername/notes-app.git`.
2. Navigate into the project directory with `cd notes-app`.
3. Install the necessary dependencies with `npm install` or `yarn install`.
4. Start the development server with `npm start` or `yarn start`.
5. Open your web browser and navigate to `http://localhost:3000` to begin using the app.

## Usage
Once you have the app running, you can start creating notes:

- Click on the "New Note" button to create a new note.
- Enter your text into the note editor. The character limit will be displayed as you type.
- To delete a note, click on the trash icon next to the note title.
- Use the search bar at the top of the page to filter notes based on their content.

## build and run

### build
```bash
docker build -t note-app:v1 .
```

### Run
```bash
docker --rm run -p  3000:3000 -v ${PWD}:/app -e CHOKIDAR_USEPOLLING=true note-app:v1
```

## Code explanation

### `NotesApp.js` component

#### State Variables
- **`notes`**: This is a state variable that holds an array of note objects. Each note object has an `id` and `text` property. The `useState` hook initializes this state with either the notes retrieved from `localStorage` or an empty array if no notes are found in `localStorage`.

```jsx
const [notes, setNotes] = React.useState(() => {
  const savedNotes = localStorage.getItem('notes');
  return savedNotes ? JSON.parse(savedNotes) : [];
});
```

- **`searchTerm`**: This is another state variable that holds the current search term entered by the user. It's initialized as an empty string.

```jsx
const [searchTerm, setSearchTerm] = React.useState('');
```

#### Computed Values
- **`filteredNotes`**: This is a computed value that filters the `notes` array based on the `searchTerm`. It uses the `Array.prototype.filter()` method to create a new array with all notes that contain the search term in their text, regardless of case.

```jsx
const filteredNotes = notes.filter((note) =>
  note.text.toLowerCase().includes(searchTerm.toLowerCase())
);
```

#### Event Handlers
- **`addNote`**: This function is triggered when the user clicks the "Add Note" button. It creates a new note object with a unique identifier generated from the current timestamp and an empty text string. Then, it updates the `notes` state by spreading the existing notes into a new array and appending the new note object.

```jsx
const addNote = () => {
  const newNote = { id: Date.now(), text: '' };
  setNotes([...notes, newNote]);
};
```

- **`updateNote`**: This function is passed as a prop to each `Note` component and is called when the user saves a note. It takes an updated note object as an argument and updates the `notes` state by mapping over the existing notes and replacing the note with the matching `id` with the updated note.

```jsx
const updateNote = (updatedNote) => {
  setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)));
};
```

- **`deleteNote`**: This function is also passed as a prop to each `Note` component and is called when the user deletes a note. It takes a note `id` as an argument and updates the `notes` state by filtering out the note with the matching `id`.

```jsx
const deleteNote = (id) => {
  setNotes(notes.filter((note) => note.id !== id));
};
```

#### Callback Functions
- **`saveNotes`**: This is a callback function that is wrapped in `useCallback` to prevent unnecessary re-creations of the function. It saves the current state of `notes` to `localStorage` as a JSON string. The `useCallback` hook takes a dependency array `[notes]` to ensure that the function is only re-created when the `notes` state changes.

```jsx
const saveNotes = React.useCallback(() => {
  localStorage.setItem('notes', JSON.stringify(notes));
}, [notes]);
```

#### Side Effects
- **`useEffect`**: This is a side effect hook that is used to perform side effects in function components. In this case, it's used to save the notes to `localStorage` whenever the `saveNotes` callback changes. The `useEffect` hook takes a dependency array `[saveNotes]` to ensure that the effect runs only when the `saveNotes` callback changes.

```jsx
React.useEffect(() => {
  saveNotes();
}, [saveNotes]);
```

#### Render Method
The component returns a `div` element that serves as the container for the entire notes app. Inside this `div`, we have:
- An `input` element for the search term. It has an `onChange` event handler that updates the `searchTerm` state whenever the user types into the input field.
- A list of `Note` components, rendered by mapping over the `filteredNotes` array. Each `Note` component is given a unique `key` prop (the note's `id`), the note object, and two callback functions (`onSave` and `onDelete`).
- A button labeled "Add Note" that, when clicked, triggers the `addNote` function to add a new note.

```jsx
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
```

This structure allows the user to interact with the notes app, adding new notes, editing existing ones, deleting notes, and searching through the notes based on the search term.



### `Note.js` component


```jsx
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
```

#### Props
- **`note`**: This is an object passed as a prop to the `Note` component. It represents the current state of the note, including its `id` and `text`.
- **`onSave`**: This is a function passed as a prop to the `Note` component. It is called when the user wants to save changes to the note.
- **`onDelete`**: This is another function passed as a prop to the `Note` component. It is called when the user wants to delete the note.

#### State Variable
- **`text`**: This is a state variable managed by the `useState` hook. It holds the current text of the note and is initialized with the `text` property of the `note` prop.

```jsx
const [text, setText] = React.useState(note.text);
```

#### Event Handlers
- **`handleChange`**: This function is an event handler for the `onChange` event of the textarea. It updates the `text` state variable with the current value of the textarea whenever the user types into it.

```jsx
const handleChange = (event) => {
  setText(event.target.value);
};
```

- **`handleSave`**: This function is an event handler for the `onClick` event of the Save button. It calls the `onSave` prop function with the updated note object, which includes the original `note` properties and the current `text` state.

```jsx
const handleSave = () => {
  onSave({ ...note, text });
};
```

#### Render Method
The component returns a `div` element that serves as the container for the note. Inside this `div`, we have:
- A `textarea` element that displays the current `text` state. It has an `onChange` event handler that calls `handleChange` whenever the user types into the textarea. The `maxLength` attribute limits the number of characters the user can enter to  500.
- Two `button` elements, one for saving the note and one for deleting it. Each button has an `onClick` event handler that calls the appropriate function (`handleSave` or `onDelete`) when the button is clicked.

```jsx
return (
  <div className="note">
    <textarea value={text} onChange={handleChange} maxLength={500} />
    <button onClick={handleSave}>Save</button>
    <button onClick={onDelete}>Delete</button>
  </div>
);
```

The `Note` component is designed to be a controlled component, meaning that its state is managed by React and updates in response to user interactions. The parent `NotesApp` component passes down the `note` object, along with the `onSave` and `onDelete` functions, to allow the `Note` component to communicate back to the `NotesApp` component when changes need to be made.


