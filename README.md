# Simple React + MongoDB (Express) App

This is a minimal full-stack app with:
- Backend: Node.js + Express + MongoDB (Mongoose)
- Frontend: React (Vite)

It lets you create and list simple todos.

## Prerequisites
- Node.js 18+
- MongoDB: Either
  - **MongoDB Atlas**: Whitelist your IP in Network Access (or use 0.0.0.0/0 for dev)
  - **Local MongoDB**: Install and run `mongod` locally

## Setup

1) Configure environment variables

```
cp server/.env.example server/.env
```
```
cp client/.env.example client/.env
```

2) Install all dependencies

From the root directory:
```bash
cd /mnt/c/Users/Moiz/Desktop/Dev/c-test
npm run install:all
```

This will install dependencies for:
- Root (Cypress, concurrently, start-server-and-test)
- Server (Express, Mongoose, etc.)
- Client (React, Vite)

## Quick Start

To install dependencies, start servers, and run tests all at once:

```bash
cd /mnt/c/Users/Moiz/Desktop/Dev/c-test
npm start
```

This will:
1. Install all dependencies (root, server, client)
2. Start the API server and client dev server
3. Run Cypress e2e tests
4. Exit when tests complete

## Run

**Important**: Make sure MongoDB is reachable first!
- For Atlas: Check your IP is whitelisted in MongoDB Atlas → Network Access
- For local: Run `mongod` or `sudo systemctl start mongod`

### Development mode (two terminals)

- Terminal 1: Start the API server
```bash
cd /mnt/c/Users/Moiz/Desktop/Dev/c-test/server
npm run dev
```
It listens on `http://localhost:5000` by default.

- Terminal 2: Start the React dev server
```bash
cd /mnt/c/Users/Moiz/Desktop/Dev/c-test/client
npm run dev
```
Vite will print a URL (default `http://localhost:5173`).

### Or run both together

```bash
cd /mnt/c/Users/Moiz/Desktop/Dev/c-test
npm run dev:all
```

Open the frontend and add todos. The app will call the API at `VITE_API_URL`.

## Run Tests Only

If dependencies are already installed:

```bash
cd /mnt/c/Users/Moiz/Desktop/Dev/c-test
npm run test:e2e
```

This starts both servers and runs Cypress tests headlessly.

## Available Scripts

- `npm run install:all` - Install all dependencies (root, server, client)
- `npm start` - Install deps + start servers + run tests (full pipeline)
- `npm run dev:all` - Start server and client dev servers concurrently
- `npm run test:e2e` - Start servers and run Cypress e2e tests
- `npm run cypress:open` - Open Cypress UI (requires servers running separately)
- `npm run cypress:run` - Run Cypress headlessly (requires servers running)

## API
- GET `/api/todos` → list todos
- POST `/api/todos` `{ text: string }` → create
- DELETE `/api/todos/:id` → delete

## Notes
- CORS is enabled and defaults to allowing `http://localhost:5173` (set `CORS_ORIGIN` in `server/.env`).
- For production, set strong values in `.env` and configure your MongoDB accordingly.
