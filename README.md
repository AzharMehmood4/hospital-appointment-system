# Hospital Appointment System

A full-stack hospital appointment system with a React + Vite frontend and an Express + MongoDB backend. The app lets patients book appointments, view doctors, search appointments, and lets administrators manage appointment statuses.

## Live preview

- https://hospital-appointment-system-git-main-azharkhank.vercel.app/

## Features

- Book a new appointment with patient and doctor details
- View scheduled appointments with search and status filtering
- Update appointment status to Pending, Approved, Rejected, or Completed
- Delete an appointment
- Client-side navigation using React without a router library
- Backend API powered by Express and MongoDB

## Project structure

- `backend/` - Express server, MongoDB connection, appointment model, API routes
- `frontend/` - React application built with Vite and Tailwind CSS

## Tech stack

- Frontend: React, Vite, Tailwind CSS, Axios
- Backend: Node.js, Express, Mongoose, CORS, dotenv
- Database: MongoDB

## Prerequisites

- Node.js 18+ installed
- npm or yarn installed
- MongoDB instance available

## Backend setup

1. Open a terminal and navigate to `backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` with the MongoDB connection string:
   ```env
   MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/your-database-name
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

The backend listens on `http://localhost:5000` by default.

## Frontend setup

1. Open a terminal and navigate to `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `frontend/` if you want to override the backend URL:
   ```env
   VITE_API_BASE_URL=https://hospital-appointment-system-f7qf.vercel.app/api/appointments
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```


## How it works

- Patients can book appointments through the booking page
- Appointments are saved in MongoDB with fields such as patient name, email, phone, doctor, date, time, reason, and status
- The admin view lets the user review appointments and change statuses or delete records

## API endpoints

- `GET /api/appointments` - fetch all appointments, with optional `search` and `status` query parameters
- `POST /api/appointments` - create a new appointment
- `PUT /api/appointments/:id` - update appointment status
- `DELETE /api/appointments/:id` - delete an appointment
