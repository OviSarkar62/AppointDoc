# AppointDoc

This is a professional-grade MERN (MongoDB, Express, React, Node.js) stack web application for booking doctor appointments. Patients can browse through a list of doctors and their availability and book an appointment with their preferred doctor. Doctors can view their schedule, manage their availability, and approve/cancel appointments.

## Project View

- ***For USER Profile***

- **Homepage**
<p align="center">
  <img alt="img-name" src="Images/Homepage from User.png" width="700">
</p>

## Installation

To install AppointDoc, you need to have Node.js and npm installed on your system. Once you have installed these, you can clone the AppointDoc repository from GitHub using the following command:

      git clone https://github.com/OviSarkar62/AppointDoc.git
      
Once you have cloned the repository, navigate to the root directory of the project and run the following command to install the required dependencies:

      npm install express joi jsonwebtoken moment mongoose morgan nodemon zxcvbn dotenv colors bcryptjs
     
 After installing the dependencies, you can start the application using the following command:
 
      npm start

The application will be available at http://localhost:3000/.


## Usage

- The AppointDoc application allows doctors to manage their appointments with ease. Doctors can create new appointments, view existing appointments, and approve or reject appointments as necessary.

- To create a new appointment, the user needs to click on the "New Appointment" button on the doctor's card. They will then be presented with a form where they can enter the details of the appointment, including date and time.

- To view existing appointments, the doctor needs to click on the "Appointments" button on the sidebar. They will then be presented with a list of all their appointments, presented by date and time. The doctor can click on any appointment to approve or reject to change it's pending status.

- To update time of availability, the doctor needs to click on the profile page where they wish to update the time of appointments. They will then be presented with a form where they can edit the start time and end time details of the appointment.

## Technologies Used

- MongoDB - NoSQL database for storing data
- Express - Backend framework for building RESTful APIs
- React - Frontend framework for building user interfaces
- Node.js - JavaScript runtime environment for building scalable server-side applications
- JWT - JSON Web Token for user authentication and authorization
- Bcrypt - Password hashing library for secure password storage

## Conclusion

AppointDoc is a simple and effective appointment booking system for doctors. It allows doctors to manage their appointments with ease, and is designed to be user-friendly and intuitive. The system is built using modern web technologies and is easy to install and use.

## Live Link

The live project: [AppointDoc](https://appoint-doc.vercel.app/login)
