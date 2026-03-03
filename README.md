# EventEase 

![EventEase Main Page](./EventEase.png)

# Project Overview
EventEase is a modern, full-stack event management and ticket booking platform. It allows users to discover local events via an interactive map, manage a persistent shopping basket for multi-ticket purchases, and track their personal booking history.

# Key Features
. Interactive Map: Discover events in real-time using Leaflet.js with markers that automatically fit the view.
. Persistent Shopping Basket: Add multiple tickets across different events to a local basket (saved in browser storage) and checkout all at once.
. User Profiles: View personal booking history with full event details and securely update account passwords.
. Admin Dashboard: Comprehensive system-wide oversight to monitor transactions and delete bookings.
. Secure Authentication: Session-based login system with role-based access control (User vs. Admin).

# Technology Stack
. Frontend: React.js, React Router, Leaflet Maps, Vite.
. Backend: Node.js, Express.js, Express-Session.
. Database: SQLite3 (Local file-based).
. State Management: LocalStorage for persistent basket data.

# Full Installation & Setup

 1. Project Initialization
First, clone the repository and navigate into the project root:
git clone https://github.com/yurihenrique98/EventEase_FullStack.git
cd EventEase_FullStack

 2. Backend & Database Setup
The application uses a SQLite3 database file. For the backend to function, ensure the eventease.db file is inside the backend/database/ directory.

# Run Backend:
cd backend
npm install
npm start
*The server will run on http://localhost:3000.*

 3. Frontend Setup
Open a new terminal window and run:
cd frontend
npm install
npm run dev
*The frontend will be available at http://localhost:5173.*

# Database Schema & Access
The system architecture relies on four relational tables:
. Users: Manages credentials, passwords, and isAdmin flags.
. Events: Contains event names, dates (YYMMDD format), and GPS coordinates.
. Tickets: Manages real-time stock levels and pricing per event type.
. Bookings: Records user transactions, linked via username and eventID.


# Default Test Credentials
| Role  | Username   | Password      |
| ----- | ---------- | ------------- |
| Admin | jane_admin | adminPass456  |
| User  | john_doe   | password123   |
