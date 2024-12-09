require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user_models');
const jwt = require('jsonwebtoken');
passport.use( 
    new GoogleStrategy( 
      { 
        clientID: process.env.client_id, 
        clientSecret: process.env.client_secret, 
        callbackURL: process.env.redirect_uris, 
      }, 
  
      async(accessToken, refreshToken, profile, done) =>{ 
        try{

            //check if user already exit in the database
            let user = await User.findOne({email:profile._json.email});
           
            if(!user){
                //if not the user then we have to create the user
                user = await User.create({
                    fname:profile._json.given_name,
                    lname:profile._json.family_name,
                    email:profile._json.email,
                    googleId:profile.id,
                    role:"user"
                });
            }
            
            user.lastLoginAt = new Date(); // Use current date-time
            await user.save(); // Save updates directly to the user document

           //generate JWT Token
           const token= jwt.sign({id:user._id,email:user.email}, process.env.jwtsecrettoken,{expiresIn:'4h'});
           return done(null, { user, token });
        
      }
      catch(err){
        return done(err, null);
      } 
    }

    ) 
  ); 

  passport.serializeUser((data, done) => {
    done(null, data); // Store user and token in session
  });
  
  passport.deserializeUser((data, done) => {
    done(null, data); // Retrieve user and token from session
  });