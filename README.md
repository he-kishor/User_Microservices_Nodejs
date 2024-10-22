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


## 🌐 API Endpoint 🔌
Provides several APIs for user authentication and authorization
http://localhost:3000/api

| Method | Path                    | Description                                                                                      | Authenticate    |
|--------|-------------------------|--------------------------------------------------------------------------------------------------|-----------------|
| POST   | /users/signup           | Create the new Users                                                                             |  False          |
| POST   | /users/login            | Login with email and password                                                                    |  False          |
| PUT    | /users/updateusers      | Update user profile fname, lname, gender                                                         |  True           |
| PUT    | /users/updatepassword   | Update password using old password and new password                                              |  True           |
| POST   | /users/forgotpasswords  | When the user requests a forgotten password then it sends the OTP mail, to verify the user       |  False          |
| POST   | /users/resetpasswordotps| Once the user receives the otp then he requests otp with a new password it validates and updates |  False          |
