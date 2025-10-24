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

- Server: copy the example and edit if needed
```
cp server/.env.example server/.env
```
- Client: copy the example (already set to use `http://localhost:5000`)
```
cp client/.env.example client/.env
```

2) Install dependencies (WSL)

Open a terminal and run:
```
# at repo root
cd /mnt/c/Users/Moiz/Desktop/Dev/c-test

# install server
cd server && npm install

# install client
cd ../client && npm install
```

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

## API
- GET `/api/todos` → list todos
- POST `/api/todos` `{ text: string }` → create
- DELETE `/api/todos/:id` → delete

## Notes
- CORS is enabled and defaults to allowing `http://localhost:5173` (set `CORS_ORIGIN` in `server/.env`).
- For production, set strong values in `.env` and configure your MongoDB accordingly.
