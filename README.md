# EventEase Full-Stack

A professional Event Management Web Application built with the PERN-lite stack (React, Express, and SQLite).

## Key Features & Improvements
- **Reverse Proxy:** Implemented Vite proxying to handle API requests seamlessly without hardcoded URLs.
- **Secure Authentication:** Session-based login/logout system using Express and SQLite.
- **Dynamic Routing:** Decoupled frontend/backend architecture for better scalability.
- **Clean Architecture:** Organized using a clear folder structure and proper `.gitignore` protocols.

## Tech Stack
- **Frontend:** React, Vite, CSS3
- **Backend:** Node.js, Express
- **Database:** SQLite

## Test Credentials
The following users are pre-configured in the `eventease.db` SQLite database for testing purposes:

| Username | Password | Role |
| :--- | :--- | :--- |
| john_doe | password123 | User |
| jane_admin | adminPass456 | Admin |
| michael_user | mypass789 | User |

## Installation & Setup
1. **Clone the repo:** `git clone https://github.com/yurihenrique98/EventEase_FullStack.git`
2. **Backend:**
   - `cd backend`
   - `npm install`
   - `node app.js`
3. **Frontend:**
   - `cd frontend`
   - `npm install`
   - `npm run dev`
