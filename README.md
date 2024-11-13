# Web-Chat-App

A simple chat app using Socket.io, with a frontend built using Vite and a backend using Node.js.

## Features

- Real-time messaging
- User login
- Message bubbles with tails
- User avatars

## Technologies Used

- Frontend: Vite, React, react-icons, react-router-dom
- Backend: Node.js, Express, Socket.io, nodemon

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/peter-mwau/Web-Chat-App.git
```

```
cd Web-Chat-App
```

## Backend Setup

- Navigate to the backend directory:

```
cd backend
```

- Install the dependencies:

```
npm install
```

- Start the backend server:

```
npm start
```

- The backend server will start on http://localhost:8080.

## Frontend Setup

- Navigate to the frontend directory:

```
cd frontend
```

- Install the dependencies:

```
npm install
```

- Start the frontend development server:

```
npm run dev
```

- The frontend server will start on http://localhost:5173.

## Usage

- Open your browser and navigate to http://localhost:5173.
- Enter a username to log in.
- Start chatting in real-time!

## Project Structure

Web-Chat-App/
├── backend/
│ ├── node_modules/
│ ├── server.js
| ├── socket.js
| ├── store.js
│ ├── package.json
│ └── package-lock.json
├── frontend/
│ ├── node_modules/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── index.html
│ ├── package.json
│ ├── package-lock.json
│ └── vite.config.js
└── README.md

### Contributing

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Open a pull request.

## License

This project is licensed under the MIT License.
