# 👤 User Management Microservices Backend API

## 🚀 Services provided in this microservice 🛠️
* **User Registration (Signup)**
* **User Login (Email and Password) 🔐**
* **Forgot Password**
* **Update Password**

## ✨ Features used in this service 🛠️
* **JWT Token 🪪**
  * Create a token using user ID, role, and timestamp.
  * Extract user ID from the token.
  * Token expiration set to 4 hours.
  
* **MongoDB Database 🍃**
  * Using MongoDB with Mongoose ORM for database interactions.
  
* **Password Hashing 🔑**
  * Secure password storage using Bcrypt for hashing.


### API Endpoint
Provides several API for user authentication and authorization
http://localhost:3000/api

| Method | Path                  | Description                                         |
|--------|-----------------------|-----------------------------------------------------|
| POST   | /users/signup         | Create the new Users                                | 
| POST   | /users/login          | Login with email and password                       |
| PUT    | /users/updateusers    | Update user profile fname, lname, gender            |
| PUT    | /users/updatepassword | Update password using old password and new password |
