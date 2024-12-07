// gateway/routes/users.js
const express = require('express');
const userRoutes = require('../../src/Users/routes/user_route'); // Points to user service routes
const oauthroutes = require('../../src/Users/routes/oauthservice');
const router = express.Router();

router.use('/users', userRoutes); // All /users-related routes will be forwarded to the user microservice
router.use('/oauth2',oauthroutes);
module.exports = router;
