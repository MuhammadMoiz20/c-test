# React Notes App

A modern post-it style notes application built with React, featuring drag-and-drop functionality, markdown support, and state management.

## Features

- ⚡️ Vite for fast development and building
- 🎨 SASS for enhanced CSS styling
- 📝 ESLint for code quality and consistency
- 🔄 Hot Module Replacement (HMR)
- 🎯 Auto-prefixing for CSS
- 📦 Modern JavaScript support
- 📝 Create, edit, and delete notes
- 🔄 Drag and drop notes with react-draggable
- 📊 Markdown rendering with react-markdown
- 🧠 Immutable state management with Immer

## Getting Started

### Prerequisites

- Node.js (v22.13.1 or higher)

1. Clone the repository:
```bash
git clone https://github.com/dartmouth-cs52-25s/lab3-react-notes-MuhammadMoiz20.git
cd lab3-react-notes-MuhammadMoiz20
```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
lab3-react-notes-MuhammadMoiz20/
├── src/
│   ├── components/
│   │   ├── App.jsx   # Main application component
│   │   └── Note.jsx  # Note component with drag-and-drop
│   ├── services/
│   │   └── datastore.js  # Firebase integration (future use)
│   ├── index.jsx     # Main JavaScript entry point
│   └── style.scss    # Main styles
├── index.html        # Main HTML file
├── vite.config.js    # Vite configuration
├── .eslintrc.json    # ESLint configuration
└── package.json      # Project dependencies and scripts
```

## Development

- The development server runs on `http://localhost:5173`
- Hot Module Replacement is enabled by default
- ESLint is configured with Airbnb style guide
- SASS is configured for CSS preprocessing
- PropTypes validation for component props
- Immer for immutable state management
- React Draggable for note positioning
- React Markdown for rendering markdown content

## Deployment

The project is configured for deployment on Render.com. It will automatically deploy when changes are pushed to the main branch.

## Implemented Features

### Core Features
- ✅ In-memory state management for notes
- ✅ Note creation with title input
- ✅ Note deletion functionality
- ✅ Drag-and-drop movement using react-draggable
- ✅ Markdown rendering using react-markdown
- ✅ Note editing with title and content fields
- ✅ Immutable state updates using Immer

### UI/UX Features
- ✅ Post-it style notes with custom styling
- ✅ Visible drag handles for intuitive interaction
- ✅ Responsive design for different screen sizes
- ✅ Hover effects for interactive elements
- ✅ Styled buttons for edit, delete, and done actions

### Technical Features
- ✅ ESLint integration for code quality
- ✅ PropTypes validation for component props
- ✅ Modern React patterns with functional components and hooks
- ✅ Optimized rendering with useRef for draggable elements

## Extra Credit Features

### Note Organization
- ✅ Category system with color-coded notes (default, work, personal, ideas, important)
- ✅ "Show All Notes" toggle to display all notes or filter by category
- ✅ Category dropdown selector when filtering is enabled
- ✅ Category selection when editing notes

### zIndex Sorting
- ✅ Notes automatically come to the front when clicked, dragged, or edited
- ✅ Implemented bringToFront function that calculates the highest zIndex
- ✅ New notes are created with the highest zIndex to appear on top
- ✅ Proper layering of notes for improved user experience

### Resizable Notes
- ✅ Resize handle in the bottom-right corner of each note
- ✅ Click and drag functionality to resize notes
- ✅ Minimum size constraints to maintain usability
- ✅ Visual feedback with handle becoming more visible on hover
- ✅ Auto-resizing when entering edit mode to ensure controls are visible

