# Analytics Backend

NestJS backend for the User Analytics Application. This service handles tracking user interactions and providing analytics data.

## Description

Built with [NestJS](https://github.com/nestjs/nest), this backend:
- Receives and stores user tracking events (page views, clicks)
- Provides APIs to query sessions, events, and heatmap data
- Uses MongoDB with Mongoose for data persistence
- Enables CORS for the frontend client

## Project setup

```bash
$ npm install
```

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB connection string
NEST_MONGODB_URI=mongodb://127.0.0.1:27017/analyticsDB

# CORS origin for frontend
CORS_ORIGIN=http://localhost:3001

# Server port
PORT=3000
```

## Prerequisites

- Node.js 16+ and npm
- MongoDB running locally or a connection string to a MongoDB instance

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The backend will start on `http://localhost:3000` by default.

## API Endpoints

- **POST** `/analytics/events` — Submit a tracking event
- **GET** `/analytics/sessions` — List all sessions with event counts
- **GET** `/analytics/sessions/:sessionId/events` — Fetch all events for a session
- **GET** `/analytics/heatmap?page_url=...` — Fetch click coordinates for a specific page

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

For production deployment, ensure:
1. MongoDB is properly configured with credentials
2. Set appropriate `CORS_ORIGIN` for your frontend domain
3. Environment variables are securely set in your hosting platform

## Support

For NestJS framework help, check out the [NestJS Documentation](https://docs.nestjs.com).

## License

This project is MIT licensed.
