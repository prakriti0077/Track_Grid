# Task Management Web App

A polished, full‑stack Task Manager with CRUD operations, built using Node.js, Express, MongoDB, and a responsive vanilla frontend.

## Live Demo
https://trackgrid-production.up.railway.app/

## Screenshot
![Task Manager Screenshot](assets/screenshot.png)

## Project Highlights
- Full CRUD workflow with clean REST API design
- Responsive UI with filters, search, and live stats
- Deployed on Railway with MongoDB Atlas

## Features
- Create, read, update, delete tasks
- Task fields: title, description, status
- Responsive UI with search, filters, and stats
- Edit tasks in a clean modal

## Project Structure
- `backend/` Express + MongoDB API
- `frontend/` HTML/CSS/JS client

## Local Setup

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

### 2) Frontend (local dev)
Open `frontend/index.html` in your browser.

## Deploy on Render (single service)

1. Push code to GitHub.
2. Create a new **Web Service** on Render.
3. Connect your repo.
4. Set **Root Directory** to `backend`.
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables:
   - `MONGO_URI` (use your MongoDB connection string)
   - `MONGO_DB=task_manager`
8. Deploy.

The Express server will serve the frontend from `/frontend` automatically.

## API Endpoints
- `GET /api/tasks` — list tasks
- `POST /api/tasks` — create task
- `GET /api/tasks/:id` — get task
- `PUT /api/tasks/:id` — update task
- `DELETE /api/tasks/:id` — delete task
