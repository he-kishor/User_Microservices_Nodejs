const mongoose=require('mongoose');
const UserSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
  role: { type: String, required: true },
  gender: { type: String, required: true },
  passwordChangedAt: { type: Date },  // Field for storing password change timestamp
  lastLoginAt: { type: Date },         // Field for storing last login timestamp
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields
    

User_m=mongoose.model("Users_main",UserSchema);
module.exports=User_m;