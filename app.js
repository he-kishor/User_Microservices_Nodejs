require('dotenv').config();
const express=require('express');
const connectDB=require('./Shared/dbconnect');
const Routes=require('./gateway/routes/route');
const { logger } = require('./setups/middleware');
const session =require('express-session');
const passport = require('passport');
const cors = require('cors');
require('./src/Users/services/passport');
//app start
const app=express();

//middleware
app.use(express.json());
app.use(logger);

app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          // Allow requests with no origin (like mobile apps or Postman) or listed origins
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    })
  );
  //middleware
  // Session Middleware
  app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: 'session secret',
      })
    );
    
    // Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());
    
//simple get method
app.get("/",(req,res)=>{
   return res.send("Welcome in authentication and authorization")
});
//user route
app.use("/api",Routes);
const PORT=process.env.PORT;

//connect db then server will start 
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log('The server is running on the port 3003');
    });
})
