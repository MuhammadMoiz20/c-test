import React, { useState, useEffect } from 'react';
import Note from './Note';
import {
  onNotesValueChange,
  createNote as fbCreateNote,
  updateNote as fbUpdateNote,
  deleteNote as fbDeleteNote,
} from '../services/datastore';

const CATEGORIES = {
  default: { color: '#fff176' },
  work: { color: '#80deea' },
  personal: { color: '#ffab91' },
  ideas: { color: '#c5e1a5' },
  important: { color: '#f48fb1' },
};

export default function App() {
  const [notes, setNotes] = useState({});
  const [noteInput, setNoteInput] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    onNotesValueChange((fbNotes) => {
      setNotes(fbNotes);
    });
  }, []);

  const createNote = () => {
    if (noteInput.trim() === '') return;
    const highestZ = Object.values(notes).reduce((max, note) => Math.max(max, note.zIndex), 0);
    fbCreateNote({
      title: noteInput,
      text: '',
      x: 20,
      y: 20 + ((Object.keys(notes).length * 10) % 100),
      zIndex: highestZ + 1,
      width: 220,
      height: 200,
      category: 'default',
      createdAt: Date.now(),
    });
    setNoteInput('');
  };

  const bringToFront = (id) => {
    const highestZ = Object.values(notes).reduce((max, note) => Math.max(max, note.zIndex), 0);
    fbUpdateNote(id, { zIndex: highestZ + 1 });
  };

  const onMove = (id, x, y) => {
    fbUpdateNote(id, { x, y });
    bringToFront(id);
  };

  const onUpdate = (id, fields) => {
    fbUpdateNote(id, fields);
  };

  const updateCategory = (id, category) => {
    fbUpdateNote(id, { category });
  };

  const onResize = (id, width, height) => {
    fbUpdateNote(id, { width, height });
  };

  const deleteNote = (id) => {
    fbDeleteNote(id);
  };

  const getFilteredNotes = () => {
    let filteredNotes = Object.entries(notes);

    if (!showAll && filterCategory !== 'all') {
      filteredNotes = filteredNotes.filter(([, note]) => note.category === filterCategory);
    }

    return filteredNotes;
  };

  return (
    <div id="board">
      <div className="app-controls">
        <div className="note-creator">
          <input
            type="text"
            className="noteinput"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            placeholder="Add a new note..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') createNote();
            }}
          />
          <button type="button" onClick={createNote}>Create Note</button>
        </div>

        <div className="note-organizer">
          <div className="filter-controls">
            <label htmlFor="show-all">
              <input
                id="show-all"
                type="checkbox"
                checked={showAll}
                onChange={() => setShowAll(!showAll)}
              />
              Show All Notes
            </label>

            {!showAll && (
              <label htmlFor="category-filter">
                Category:
                <select
                  id="category-filter"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  disabled={showAll}
                >
                  <option value="all">All Categories</option>
                  {Object.keys(CATEGORIES).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </label>
            )}
          </div>
        </div>
      </div>

      {getFilteredNotes().map(([id, note]) => (
        <Note
          key={id}
          id={id}
          note={note}
          onDelete={() => deleteNote(id)}
          onMove={onMove}
          onUpdate={onUpdate}
          onResize={onResize}
          bringToFront={() => bringToFront(id)}
          updateCategory={updateCategory}
          categories={CATEGORIES}
        />
      ))}
    </div>
  );
}
