# SportNest

## Purpose

SportNest is a sports facility booking platform where users can browse available sports facilities, view detailed information, book available time slots, manage their bookings, and facility owners can manage their facilities.

## Live URL

https://your-live-site-url.com

## Features

* User authentication with Email/Password and Google Login
* Browse all available sports facilities
* View detailed facility information
* Book available facility time slots
* Automatic prevention of duplicate slot bookings
* My Bookings page for managing reservations
* Cancel bookings with ownership verification
* Add new facilities
* Update facility information
* Delete facilities
* Protected routes for authenticated users
* Responsive design for mobile, tablet, and desktop devices

## NPM Packages Used

### Frontend

* next
* react
* react-dom
* better-auth
* react-hot-toast
* lucide-react
* tailwindcss

### Backend

* express
* mongodb
* cors
* dotenv

## Installation

### Client

```bash
npm install
npm run dev
```

### Server

```bash
npm install
node index.js
```

## Environment Variables

### Client

```env
BETTER_AUTH_SECRET=your_secret
BETTER_AUTH_URL=your_client_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGODB_URI=your_mongodb_connection_string
```

### Server

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```
