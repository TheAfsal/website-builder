# Template Editor Application

Welcome to the **Template Editor Application**! This project is a powerful web-based tool that allows users to select stunning templates and customize them using an interactive drag-and-drop editor powered by GrapesJS. The application consists of a **React-based frontend** and a **Node.js/Express.js backend** with TypeScript and MongoDB for project management and authentication.

- **Frontend**: Built with React, React Router, and GrapesJS Studio SDK, enabling template selection and real-time editing.
- **Backend**: Built with Node.js, Express.js, TypeScript, and MongoDB, providing APIs for user authentication and project storage.

Perfect for designers and developers looking to create beautiful, responsive layouts with ease, backed by robust server-side functionality.

## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

### Frontend

- **Stunning Templates**: Browse and select from a variety of pre-designed, modern templates with elegant layouts.
- **Interactive Editor**: Utilize the GrapesJS editor for real-time editing, drag-and-drop functionality, and component customization.
- **Seamless Navigation**: Navigate between template selection and editor pages using React Router.
- **HTML Export**: Export edited content as HTML for further use.
- **TypeScript Support**: Leverages TypeScript for type safety and enhanced development experience.
- **Responsive Design**: Optimized for various screen sizes with modern CSS techniques.

### Backend

- **User Authentication**: Secure user registration and login with JWT and cookie-based authentication.
- **Project Management**: Save, load, and list projects with unique project IDs, stored in MongoDB.
- **AI Integration**: Uses Google Generative AI for generating template layouts and editing components.
- **TypeScript & ESM**: Built with TypeScript and ES Modules for type safety and modern JavaScript.
- **RESTful APIs**: Provides endpoints for user management (`/api/users`), project management (`/api/projects`), and AI generation (`/api/generate`).

## Demo

Check out a live demo (once deployed) at:

- Frontend: [Insert Frontend URL Here](#) (e.g., Vercel or Netlify)
- Backend: [Insert Backend URL Here](#) (e.g., Render or Heroku)

_Note: Deploy both frontend and backend to update these links._

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 14.x or higher (recommended: LTS, e.g., 24.4.0 for backend compatibility)  
  [Download Node.js](https://nodejs.org/)
- **npm**: Version 6.x or higher (included with Node.js)
- **Git**: For cloning the repository  
  [Download Git](https://git-scm.com/)
- **MongoDB**: Local installation or a cloud instance (e.g., MongoDB Atlas) for the backend  
  [Set Up MongoDB](https://www.mongodb.com/)

## Installation

### Frontend

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<username>/<repo-name>.git
   cd frontend
   ```
2. **Install Dependencies**:

   ```bash
   npm install
   ```

   Key dependencies:

   - `react`
   - `react-dom`
   - `react-router-dom`
   - `@grapesjs/studio-sdk/react`
   - `typescript`

3. **Configure Environment Variables**:
   Create a `.env` file in the `frontend` directory:
   ```plaintext
   REACT_APP_API_URL=http://localhost:3000/api
   ```
   Update `REACT_APP_API_URL` to the backend URL after deployment.

### Backend

1. **Navigate to Backend Directory**:
   ```bash
   cd backend
   ```
2. **Install Dependencies**:

   ```bash
   npm install
   ```

   Key dependencies:

   - `express`
   - `mongoose`
   - `jsonwebtoken`
   - `bcrypt`
   - `@google/generative-ai`
   - `typescript`

3. **Configure Environment Variables**:
   Create a `.env` file in the `backend` directory:
   ```plaintext
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   MONGO_URI=mongodb://localhost:27017/grapesjs
   JWT_SECRET=your_jwt_secret
   GOOGLE_API_KEY=your_google_api_key
   NODE_ENV=development
   ```
   Replace `your_jwt_secret` and `your_google_api_key` with actual values. Use MongoDB Atlas for `MONGO_URI` if not running locally.

## Usage

### Frontend

1. **Start the Development Server**:
   ```bash
   npm start
   ```
   Open [http://localhost:5173](http://localhost:5173) to view the app. The page reloads on code changes.
2. **Explore Templates**:
   - On the homepage (`/`), browse the grid of templates.
   - Click a template to navigate to the editor page (`/editor/:projectId`) with the selected template loaded.
3. **Edit and Export**:
   - Customize the template using the GrapesJS editor.
   - Use the AI-powered sidebar to generate changes (e.g., "Change background color to blue").
   - Click "Export HTML" to view the HTML, "Preview" for live preview, or "Back to Templates" to return.

### Backend

1. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Runs the server with `nodemon` and `ts-node` at [http://localhost:3000](http://localhost:3000).
2. **Test APIs**:
   - Register a user:
     ```bash
     curl -X POST http://localhost:3000/api/users/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
     ```
   - Login and get a JWT cookie:
     ```bash
     curl -X POST http://localhost:3000/api/users/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
     ```
   - Save a project (requires JWT cookie):
     ```bash
     curl -X POST http://localhost:3000/api/projects/<projectId> \
     -H "Content-Type: application/json" \
     -b "builder-id=<your-jwt-token>" \
     -d '{"data":{"pages":[{"name":"Home","component":"<h1>Test</h1>"}]}}'
     ```

## Project Structure

### Frontend

```
frontend/
├── node_modules/          # Dependency files
├── public/               # Static files (e.g., index.html)
├── src/                  # Source code
│   ├── App.tsx           # Main app component with routing
│   ├── TemplatePage.tsx  # Template selection page
│   ├── EditorPage.tsx    # Editor page with GrapesJS
│   ├── services/         # API services (e.g., builder.api.ts)
│   ├── types/            # Custom TypeScript declarations
│   └── index.tsx         # Entry point
├── package.json          # Project metadata and dependencies
├── README.md             # This file
├── tsconfig.json         # TypeScript configuration
└── .eslintrc             # ESLint configuration
```

### Backend

```
backend/
├── node_modules/         # Dependency files
├── src/                  # Source code
│   ├── config/           # Database configuration
│   │   └── database.ts
│   ├── middleware/       # Authentication middleware
│   │   └── auth.ts
│   ├── models/           # Mongoose schemas
│   │   ├── user.ts
│   │   └── project.ts
│   ├── routes/           # API routes
│   │   ├── userRoutes.ts
│   │   ├── projectRoutes.ts
│   │   └── generateRoutes.ts
│   ├── controllers/      # Request/response logic
│   │   ├── userController.ts
│   │   ├── projectController.ts
│   │   └── generateController.ts
│   ├── services/         # Business logic
│   │   ├── userService.ts
│   │   ├── projectService.ts
│   │   └── generateService.ts
│   ├── types/            # Custom TypeScript types
│   │   └── index.ts
│   └── server.ts         # Main server entry point
├── .env                  # Environment variables
├── nodemon.json          # Nodemon configuration
├── package.json          # Project metadata and dependencies
└── tsconfig.json         # TypeScript configuration
```

## Available Scripts

### Frontend

In the `frontend/` directory:

- `npm start`: Runs the app in development mode (port 5173).
- `npm run build`: Builds the app for production to the `build` folder.
- `npm test`: Runs the test suite (configure tests as needed).
- `npm run eject`: Ejects the configuration (not reversible, use with caution).

### Backend

In the `backend/` directory:

- `npm run dev`: Runs the server in development mode with `nodemon` and `ts-node`.
- `npm run build`: Compiles TypeScript to JavaScript in the `dist` folder.
- `npm start`: Runs the compiled server (`node dist/server.js`).
