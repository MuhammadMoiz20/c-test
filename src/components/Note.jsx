import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Draggable from 'react-draggable';
import ReactMarkdown from 'react-markdown';

function Note(props) {
  const {
    id, note, onDelete, onMove, onUpdate, onResize, bringToFront, updateCategory, categories,
  } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title || '');
  const [editText, setEditText] = useState(note.text || '');
  const nodeRef = useRef(null);

  const handleEdit = (e) => {
    if (e) e.stopPropagation();
    setEditTitle(note.title || '');
    setEditText(note.text || '');
    setIsEditing(true);
    bringToFront();

    if (note.width < 250 || note.height < 200) {
      onResize(id, Math.max(note.width, 250), Math.max(note.height, 200));
    }
  };

  const handleDone = (e) => {
    if (e) e.stopPropagation();
    onUpdate(id, { title: editTitle, text: editText });
    setIsEditing(false);
  };

  const renderContent = () => {
    if (isEditing) {
      return (
        <div className="note-editing">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            placeholder="Write Here"
          />
          <div className="note-edit-controls">
            <select
              value={note.category}
              onChange={(e) => updateCategory(id, e.target.value)}
              className="category-select"
            >
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={(e) => handleDone(e)}
              aria-label="done-editing"
            >
              Done
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="note-content">
        <h1>{note.title}</h1>
        <div className="note-text">
          <ReactMarkdown urlTransform={(url) => url}>{note.text || ''}</ReactMarkdown>
        </div>
        <div className="note-controls">
          <button
            type="button"
            onClick={(e) => handleEdit(e)}
            aria-label="edit"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            aria-label="delete"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  const startResize = (e) => {
    e.stopPropagation();
    e.preventDefault();
    bringToFront();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = note.width;
    const startHeight = note.height;

    const onMouseMove = (moveEvent) => {
      const newWidth = Math.max(150, startWidth + moveEvent.clientX - startX);
      const newHeight = Math.max(150, startHeight + moveEvent.clientY - startY);
      onResize(id, newWidth, newHeight);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleClick = () => {
    bringToFront();
  };

  return (
    <Draggable
      handle=".note-handle"
      position={{ x: note.x, y: note.y }}
      onDrag={(e, data) => onMove(id, data.x, data.y)}
      nodeRef={nodeRef}
      onStart={handleClick}
    >
      <div
        ref={nodeRef}
        className="note"
        style={{
          width: `${note.width}px`,
          height: isEditing ? `${Math.max(note.height, 250)}px` : `${note.height}px`,
          zIndex: note.zIndex,
          backgroundColor: categories[note.category]?.color || '#fff176',
        }}
        onClick={handleClick}
        onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
        role="button"
        tabIndex="0"
      >
        <div className="note-handle" role="presentation">::</div>
        {renderContent()}
        <div
          className="note-resize-handle"
          onMouseDown={startResize}
          onKeyDown={(e) => { if (e.key === 'Enter') startResize(e); }}
          role="button"
          tabIndex="0"
          aria-label="Resize note"
        />
      </div>
    </Draggable>
  );
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  note: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    zIndex: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    category: PropTypes.string,
    createdAt: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
  bringToFront: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  categories: PropTypes.objectOf(PropTypes.shape({
    color: PropTypes.string,
  })).isRequired,
};

export default Note;
