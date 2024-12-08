const express = require('express');
const passport = require('passport');


const router = express.Router();
router.get('/oauthsign', (req, res) => { 
    res.send('<a href="auth/google">Authenticate with google</a>') 
  }) 

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
  })
);

// Google Authentication Callback Endpoint
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const { user, token } = req.user;

    const maxAge = 24 * 60 * 60 * 1000;
  
      res.cookie('authToken', token, {
        httpOnly: true, // Prevent client-side access
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict', // Helps prevent CSRF
        maxAge: maxAge, // Expiration in milliseconds
    });
    res.json({
      message: 'Login Successfully',
      
      user: {
        u_id: user._id,
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        lastLoginAt: user.lastLoginAt,
      },
    });
  }
);

module.exports = router;
