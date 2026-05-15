# Client App

This is the frontend for the Simple User Analytics Application.

## Overview

The client is built with Next.js and tracks user behavior by sending analytics events to the backend.

### Features

- Tracks `page_view` events on page load
- Tracks `click` events across the page
- Stores `session_id` in `localStorage`
- Sends event payloads to the backend API
- Displays sessions with event counts in the dashboard
- Shows ordered session event history
- Loads click heatmap data for a page URL

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

## Setup

1. Install dependencies:

```bash
cd client
npm install
```

2. Configure the backend API URL in `client/.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Start the development server:

```bash
npm run dev
```

4. Open the app at:

```text
http://localhost:3001
```

## API Dependencies

The client expects the backend to provide these endpoints:

- `GET /analytics/sessions`
- `GET /analytics/sessions/:sessionId/events`
- `GET /analytics/heatmap?page_url=...`
- `POST /analytics/events`

## Notes

- The client uses `process.env.NEXT_PUBLIC_API_URL` to build the API URL.
- If the client cannot reach the backend, it logs errors to the console.
- The heatmap page renders click points using raw `x`/`y` coordinates from stored click events.
