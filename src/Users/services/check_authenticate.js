const User = require('../models/user_models');
require('dotenv').config();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const check_user = async(uid)=>{
    const user_data = await User.findById(uid);

        // Handle if user is not found
        if (!user_data) {
            throw { status: 400, message: "User does not exist" };
        }

        // Return the user data if `pass` is not present
        if (!user_data.pass) {
            return user_data;
        }


        const userPlainObject = user_data.toObject(); // Convert Mongoose document to plain object
        delete userPlainObject.pass;
        delete userPlainObject.passwordChangedAt;
        delete userPlainObject.otpExpires;
        delete userPlainObject.resetPasswordOtp;
        delete userPlainObject.refreshToken;

        return userPlainObject;

    
    


}
const loginuser =async({email,pass})=>{
    const user = await User.findOne({email});
     if(!user){
         throw ({status:400, message:"Invalid EmailID"});
 
     }
     //user hashed password
     const ispasswordValid= await bcrypt.compare(pass,user.pass);
     if (!ispasswordValid){
         throw({status:400,message:"Invalid User"})
     }
 
     const token= jwt.sign({id:user._id,email:user.email,role:user.role}, process.env.jwtsecrettoken,{expiresIn:'4h'});
     
     const refreshTokenn = jwt.sign(
         { id: user._id },
         process.env.jwtsecrettoken,
         { expiresIn: '30d' } // Set a longer expiration for the refresh token
     );
 
     const currentdate=new Date();
     const user_up =await User.findByIdAndUpdate(
         user.id,
 
         {
             $set:{
                 lastLoginAt:currentdate,
                 refreshToken:refreshTokenn
             }
         },
             {new:true}
 
         );
     return {
         //response the json object to make all kind api helpful
         
         
        
         user:{
             message:"Login Successfully",
             token:token,
             refreshTokenn:refreshTokenn,
             u_id:user_up ._id,
             email:user_up .email,
             fname:user_up .fname,
             lname:user_up .lname,
             role:user_up .role,
             gender:user_up .gender,
             lastLoginAt:user_up.lastLoginAt
             
         }
     };
    } 
module.exports = {check_user,loginuser};