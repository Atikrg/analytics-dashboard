# Simple User Analytics Application

## Overview

This repository contains a full-stack analytics demo for tracking user interactions on a webpage and visualizing sessions, journeys, and heatmap click data.

- `analytics-backend/` — NestJS backend with MongoDB and Mongoose
- `client/` — Next.js frontend with session dashboard, journey view, heatmap view, and client-side tracking

## Features

- Client-side tracking of:
  - `page_view`
  - `click`
- Each event includes:
  - `session_id` (stored in `localStorage`)
  - `event_type`
  - `page_url`
  - `timestamp`
  - `x` / `y` coordinates for click events
- Backend APIs:
  - `POST /analytics/events` — receive and store events
  - `GET /analytics/sessions` — list sessions with event counts and timestamps
  - `GET /analytics/sessions/:sessionId/events` — fetch ordered session events
  - `GET /analytics/heatmap?page_url=...` — fetch click events for a specific page URL
- Dashboard UI:
  - Sessions list with total events and last event time
  - Session detail view showing ordered event journey
  - Heatmap view showing click positions for a given page URL

## Tech Stack

- Backend: NestJS, Node.js, MongoDB, Mongoose
- Frontend: Next.js 16, React 19, Tailwind CSS
- Storage: MongoDB

## Setup

### 1. Backend

1. Open a terminal in `analytics-backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure MongoDB connection using `.env` or environment variable:
   - `NEST_MONGODB_URI` should point to your MongoDB instance
4. Start the backend server:
   ```bash
   npm run start:dev
   ```
5. Backend runs on `http://localhost:3000`

### 2. Frontend

1. Open a terminal in `client/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure `client/.env` contains:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```
4. Start the frontend app:
   ```bash
   npm run dev
   ```
5. Frontend runs on `http://localhost:3001`

## Usage

- Open the client app in the browser at `http://localhost:3001`
- The home page will automatically track a `page_view` event and capture clicks
- View sessions in the dashboard and click a session to inspect the event journey
- Use the heatmap page to enter a page URL and visualize click data

## How a User Uses the Website

1. Open the homepage (`/`)
   - The app records a `page_view` event automatically.
2. Click anywhere on the page.
   - Each click creates a `click` event with page URL, timestamp, and x/y coordinates.
3. Go to the dashboard (`/dashboard`).
   - See a list of sessions with event counts and last event time.
4. Click a session to view the user journey.
   - See the session's ordered events, including click coordinates for click events.
5. Open the heatmap page (`/heatmap`).
   - Enter a tracked page URL and click `Load` to display click points.

## Assumptions / Trade-offs

- `session_id` is stored locally in the browser via `localStorage`
- No user authentication is implemented
- Heatmap coordinates are rendered using raw event `x`/`y` values relative to the page click target
- The backend assigns timestamps on receipt to keep event timing consistent
- The project is designed as a demo; scaling, resiliency, and production hardening are minimal

## Notes

- The backend expects the frontend to call the API at `http://localhost:3000`
- CORS is enabled in the backend for `http://localhost:3001`
- If you run the backend or frontend on different ports, update the `NEXT_PUBLIC_API_URL` value accordingly
