// gateway/routes/users.js
const express = require('express');
const userRoutes = require('../../src/Users/routes/user_route'); // Points to user service routes
const router = express.Router();

router.use('/users', userRoutes); // All /users-related routes will be forwarded to the user microservice

module.exports = router;
