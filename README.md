# Task Management Web App

A polished, full‑stack Task Manager with CRUD operations, built using Node.js, Express, MongoDB, and a responsive vanilla frontend.

## Features
- Create, read, update, delete tasks
- Task fields: title, description, status
- Responsive UI with search, filters, and stats
- Edit tasks in a clean modal

## Project Structure
- `backend/` Express + MongoDB API
- `frontend/` HTML/CSS/JS client

## Setup Instructions

### 1) Backend
```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`:
```
MONGO_URI=mongodb://127.0.0.1:27017
MONGO_DB=task_manager
PORT=5000
```

Run the API server:
```bash
npm run dev
```

### 2) Frontend
Open `frontend/index.html` in your browser.

## API Endpoints
- `GET /api/tasks` — list tasks
- `POST /api/tasks` — create task
- `GET /api/tasks/:id` — get task
- `PUT /api/tasks/:id` — update task
- `DELETE /api/tasks/:id` — delete task

## Notes
- Requires a local MongoDB instance running on `localhost:27017`.
- You can swap MongoDB with another database if desired.
