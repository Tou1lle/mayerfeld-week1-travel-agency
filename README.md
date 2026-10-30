# Mayerfeld Frontend Practicum — Travel Agency Website

A full-stack travel agency website developed as part of the **Mayerfeld Frontend Practicum**, a four-week project focused on learning and applying modern web development technologies.

The project started as a simple static website built with HTML and CSS and gradually evolved into a full-stack application featuring a React frontend, Express backend, PostgreSQL database, user authentication, and Stripe payment integration.

## Live Website

**[Visit Wayfarer Travel Agency](https://mayerfeld-project.netlify.app/)**

## Project Development

The project was developed progressively across four weekly assignments, with each assignment introducing new technologies and functionality.

### Week 1 — HTML & CSS

- Built the initial travel agency website using HTML and CSS.
- Created a responsive layout with a navigation bar, hero section, tour packages, and testimonials.
- Implemented basic styling and responsive design.

### Week 2 — React & Tailwind CSS

- Migrated the static website to React using Vite.
- Rebuilt the interface using reusable React components.
- Integrated Tailwind CSS for styling.
- Improved code organization and maintainability.

### Week 3 — Backend, Database & Authentication

- Developed a REST API using Node.js and Express.
- Integrated PostgreSQL to store and retrieve tour information.
- Implemented user registration, login, and logout.
- Added session-based authentication.
- Connected the React frontend to the backend API.
- Deployed the application using Netlify, Render, and Neon.

### Week 4 — Stripe Payments & Orders

- Integrated Stripe Checkout in test mode.
- Implemented authenticated checkout for registered users.
- Added `orders` and `order_items` database tables.
- Implemented secure server-side price validation.
- Added Stripe webhook handling to verify successful payments.
- Created an order confirmation page displaying payment status.

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- React
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- PostgreSQL
- Passport.js
- Express Session
- Stripe Checkout & Webhooks

### Deployment & Hosting
- **Netlify** — Frontend hosting
- **Render** — Backend hosting
- **Neon** — PostgreSQL database hosting

## Key Features

- Responsive travel agency website
- Dynamic tour packages retrieved from PostgreSQL
- User registration and authentication
- Persistent login sessions
- Secure checkout using Stripe (test mode)
- Order creation and payment verification
- Order confirmation and payment status tracking

## Project Structure

```text
├── client/              # React frontend
│   ├── public/          # Static assets
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   └── lib/         # API utilities
│   └── package.json
│
├── server/              # Express backend
│   ├── config/          # Authentication configuration
│   ├── db/              # Database connection, queries, and schema
│   ├── routes/          # API endpoints
│   └── package.json
│
└── netlify.toml         # Netlify deployment configuration
```

## Running Locally

### Prerequisites

- Node.js and npm
- PostgreSQL database (local or hosted on Neon)
- Stripe account with test-mode API keys
- Stripe CLI for local webhook testing

### 1. Clone the Repository

```bash
git clone https://github.com/Tou1lle/mayerfeld-week1-travel-agency.git
cd mayerfeld-week1-travel-agency
```

### 2. Configure the Backend

```bash
cd server
npm install
```

Create a `.env` file with the required environment variables:

```env
PORT=3000
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_session_secret
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

Initialize the database using the project's database scripts.

### 3. Start the Backend

```bash
npm run dev
```

The Express server runs at `http://localhost:3000`.

### 4. Start the Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

### 5. Start the Stripe Webhook Listener

In a third terminal:

```bash
stripe login
stripe listen --events checkout.session.completed --forward-to localhost:3000/api/stripe/webhook
```

Copy the generated webhook signing secret into `server/.env` and restart the backend.

You can now test checkout using Stripe's test card:

**Card number:** `4242 4242 4242 4242`  
**Expiration:** Any future date  
**CVC:** Any three digits

All payments are processed in Stripe test mode. No real money is charged.

## Deployment Architecture

- **Netlify** hosts the React frontend and proxies API requests to Render.
- **Render** hosts the Express backend and handles authentication, checkout, and webhooks.
- **Neon** provides the PostgreSQL database for users, tours, orders, and sessions.
- **Stripe** handles hosted checkout and sends payment confirmation events to the backend.

## About

This project was created for educational purposes as part of the Mayerfeld Frontend Practicum. Its goal was to gain hands-on experience building, integrating, and deploying a modern full-stack web application.