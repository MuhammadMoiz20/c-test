# Kahoot API Implementation

## Overview

This project is a backend API implementation inspired by the popular quiz platform Kahoot. It provides a RESTful API that allows users to create quiz rooms, join games, answer questions, and track scores. The API is built using Express.js and MongoDB, following standard REST principles for CRUD operations.

## Features

### Core Functionality

- **Room Creation**: Admins can create rooms with custom questions and answers
- **Room Management**: Open rooms for players to join, start games, and track game state
- **Player Management**: Players can join rooms with unique names
- **Answer Submission**: Players can submit answers to questions
- **Automatic Question Advancement**: System automatically moves to the next question when all players answer
- **Scoreboard**: View top players and individual rankings
- **Game Completion**: Game ends when all questions are answered

### API Endpoints

- `POST /rooms` - Create a new room with questions
- `PATCH /rooms/:id` - Change room status (open, in progress, etc.)
- `GET /rooms/:id` - Get current room state and question
- `POST /rooms/:id` - Join a room as a player
- `POST /rooms/:id/submissions` - Submit an answer to the current question

## Extra Credit Features

### Admin Force Next Question

I've implemented the ability for admins to force the game to move to the next question, even if not all players have submitted answers. This is useful for timed games or when players are inactive.

**Implementation Details**:
- Added a `forceNextQuestion` function in the room controller
- Secured with room key authentication to ensure only admins can use this feature
- Automatically advances the game state to the next question
- Handles game completion if forcing the last question

**Usage**:
```
POST /rooms/:id/submissions
Body: {
  "roomKey": "secret",
  "force": true
}
```

### Robust Error Handling

Implemented comprehensive error handling throughout the application:
- Validation for player names to prevent duplicates
- Room state validation to ensure proper game flow
- Authentication checks for admin operations
- Proper HTTP status codes for different error scenarios

## Technologies Used

- **Backend**: Node.js with Express
- **Database**: MongoDB with Mongoose ODM
- **Testing**: Cypress for end-to-end API testing

## Setup and Running

### Prerequisites

- Node.js (v14+)
- MongoDB Community Edition

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Start MongoDB: `brew services start mongodb-community`
4. Start the server: `npm start`

### Testing

Run the Cypress tests to verify the API functionality:

```
npm test
```

## Deployment

This application can be deployed to Render.com with a MongoDB Atlas database:

1. Create a MongoDB Atlas account and set up a free cluster
2. Get your MongoDB connection string
3. Create a new Web Service on Render.com
4. Set the MONGODB_URI environment variable to your Atlas connection string
5. Deploy your application

