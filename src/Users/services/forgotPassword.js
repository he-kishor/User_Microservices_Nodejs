require('dotenv').config();
const User = require("../models/user_models");
const nodemailer = require('nodemailer');

exports.user_forgotpassword = async(email) =>{
    const get_users = await User.findOne({'email':email});
    if(!get_users){
        throw ({status:400, message:"User not exits"});
    }
    const otp = Math.floor(1000+ Math.random() * 9000);
    const otpExpire = new Date();
    //get one minute otp expiration time limit
    otpExpire.setMinutes(otpExpire.getMenutes()+1);
    users_updaed = await User.findbyIdUpdate(
        get_users._id,
        {
            $set:{
                resetPasswordOtp:otp,
                otpExpires:otpExpire
            }
        }, 
        {new:true}
    );
    
    //otp send through mail
    const transporter = nodemailer.createTransport({
        auth:{
            user:process.env.app_email,
            pass:process.env.app_email_pass,
        },
    });

    // designed email body
    const mailOptions = {
        from:process.env.app_email,
        to:email,
        subject:'Password reset OTP',
        test:`Your OTP (It is expired after 1 min): ${otp}`,
    };

    // sending email
    transporter.sendMail(mailOptions,(error, info)=>{
        if (error){
            throw ({status:500,messag:"Isssue while sending OTP",error})
        }
        else{
            return {data:"Your OTP send to Email"};
        }
    });


}
