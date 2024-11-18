# TypeScript React Project

This is a boilerplate project set up with TypeScript and React. It is intended to help you get started with building React applications with type safety provided by TypeScript.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [License](#license)

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org) (>= 12.x)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/your-project-name.git

2. **Navigate to the project folder**:
    ```bash
    cd your-project-name

3. **Install dependecies**:
    ```bash
    npm install

4. **Running backend**:
    ```bash
    # cd to backend
    npm start

5. **Running frontend**:
    ```bash
    # cd to frontend
    npm start

6. **Accessing the pages**:

http://localhost:3000/produtos-cadastrar

http://localhost:3000/produtos

http://localhost:3000/fornecedores

http://localhost:3000/fornecedores-cadastrar

http://localhost:3000/compras

http://localhost:3000/compras-cadastrar



## Folder structure (in revision)

```perl
estudo/
├── frontend/                   # Frontend (React + TypeScript)
│   ├── public/                  # Public static files
│   │   └── index.html           # Main HTML template
│   ├── src/                     # Source code for the frontend
│   │   ├── assets/              # Static assets (images, fonts)
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # Pages or views
│   │   ├── hooks/               # Custom React hooks
│   │   ├── services/            # API services (e.g., Axios)
│   │   ├── App.tsx              # Main React component
│   │   ├── index.tsx            # Entry point for React
│   └── package.json             # Frontend dependencies and scripts
├── backend/                    # Backend (Node.js/Express + TypeScript)
│   ├── src/                     # Source code for the backend
│   │   ├── controllers/         # Express route handlers
│   │   ├── models/              # Database models (e.g., Mongoose models)
│   │   ├── routes/              # API routes
│   │   ├── services/            # Business logic
│   │   ├── app.ts               # Express app configuration
│   │   ├── server.ts            # Server setup
│   └── package.json             # Backend dependencies and scripts
├── .gitignore                  # Git ignore file
├── tsconfig.json               # TypeScript configuration (for both frontend and backend)
├── README.md                   # Project README file
└── package.json                # Root package.json for managing both frontend and backend scripts





## License

This project is licensed under the MIT License - see the LICENSE file for details.
