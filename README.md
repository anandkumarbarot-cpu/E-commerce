# E-commerce Product Management System

This is a full-stack E-commerce application built with the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

- **frontend/**: React application using Vite.
- **backend/**: Node.js + Express application.

## Prerequisites

- Node.js (v18+ recommended)
- MongoDB (Running locally or Atlas URI)
- Redis (Optional, check backend config)

## Quick Start

### 1. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Set up Environment Variables:

1.  Copy `.env.example` to `.env`.
2.  Update the values in `.env` (MongoDB URI, Port, etc.).
3.  **To seed the database on start**, add `SEED_DATA=true` to your `.env` file.

```bash
cp .env.example .env
```

Start the server:

```bash
npm run dev
```

The server should start on `http://localhost:5000` (or your configured PORT).

### 2. Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Access the application at `http://localhost:5173` (default Vite port).

## Features

- Product Management (CRUD).
- Shopping Cart.
- Order History.
- Authentication (JWT).

