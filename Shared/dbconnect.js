
const mongoose = require('mongoose');
//universal dabase connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODBP, {
      
    });
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
