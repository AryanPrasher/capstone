# MERN Starter

Monorepo layout designed for a **Vercel** React frontend and **Render** Express API.

## Local setup

1. Copy `server/.env.example` to `server/.env` and add a MongoDB connection string.
2. Copy `client/.env.example` to `client/.env`.
3. Install dependencies from the repository root: `npm install`.
4. Start both apps: `npm run dev`.

The frontend runs on `http://localhost:5173` and the API on `http://localhost:5000`.

## Deploy

### API — Render

Create a Render Web Service pointing to this repository. The included `render.yaml` supplies the main settings. Set `MONGODB_URI` and `CLIENT_URL` in Render's environment variables; set `CLIENT_URL` to the eventual Vercel URL.

### Client — Vercel

Import the same repository in Vercel and set the **Root Directory** to `client`. Vercel will use `client/vercel.json`. Add `VITE_API_URL` as an environment variable with your Render API URL, such as `https://your-api.onrender.com/api`.

After deployment, update Render's `CLIENT_URL` to your Vercel URL. The API health check is at `/api/health`.
