Job Board Project

Overview

This project is a Job Board application built with a frontend and backend. You can use it to post jobs, apply for jobs, and manage job-related activities. Follow the instructions below to set up and run the project.

Backend

The backend of the application is located in the backend directory.

Steps to Run Backend:

Navigate to the backend folder:

cd backend

Install the dependencies:

npm install

Connect the backend to your MongoDB database. Open the app.js file and locate the MongoDb function:

function MongoDb() {
    mongoose
        .connect(
            'mongodb://127.0.0.1:27017/jobBoard'
        )
        .then(() => console.log('Connected to db'))
        .catch(() => console.log(' not connected !'));
}

Replace the connection string mongodb://127.0.0.1:27017/jobBoard with your own MongoDB connection string if necessary.

Run the backend server:

npm start

The backend should now be running on the specified port (default is 3000).

Frontend

The frontend of the application is located in the job-board directory.

Steps to Run Frontend:

Navigate to the job-board folder:

cd job-board

Install the dependencies:

npm install

Start the development server:

npm start

The frontend should now be running on http://localhost:5173.

Notes:

Ensure that both the frontend and backend are running simultaneously to fully use the application.

Make sure you have MongoDB installed and running locally or replace the connection string in app.js with your remote MongoDB URI.

For any issues or questions, feel free to reach out during class or post them in the project discussion forum.



