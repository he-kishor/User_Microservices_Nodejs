require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require("../models/user_models");
const nodemailer = require('nodemailer');


const user_forgotpassword = async (email) => {
        const get_users = await User.findOne({ 'email': email });
        if (!get_users) {
            throw ({ status: 400, message: "User not exists" });
        }
    
        const otp = Math.floor(1000 + Math.random() * 9000);
        const otpExpire = new Date();
        otpExpire.setMinutes(otpExpire.getMinutes() + 1);
    
        const users_updated = await User.findByIdAndUpdate(
            get_users._id,
            {
                $set: {
                    resetPasswordOtp: otp,
                    otpExpires: otpExpire
                }
            },
            { new: true }
        );
    
        // Configure transporter with correct SMTP settings
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            host: 'smtp.gmail.com', // Gmail's SMTP server
            port: 465, //  secure connections
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.app_email, 
                pass: process.env.app_email_pass, 
            },
        });
    
        // Designed email body
        const mailOptions = {
            from: process.env.app_email,
            to: email,
            subject: 'Password reset OTP',
            text: `Your OTP (It is expired after 1 min): ${otp}`, // Fixed typo from 'test' to 'text'
        };
    
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return reject({ status: 500, message: "Issue while sending OTP", error });
                } else {
                    return resolve({ data: `Your OTP has been sent to your email` });
                }
            });
        });
    };
    

const user_resetPassword = async ({ email, new_password, confirm_password, otp }) => {
    // Check for required parameters
    if (!email || !new_password || !confirm_password || !otp) {
        throw { status: 400, message: "User must provide email, new_password, confirm_password, and OTP" };
    }

    // Check if new_password and confirm_password match
    if (new_password !== confirm_password) {
        throw { status: 400, message: "Password does not match with confirmation" };
    }

    // Find the user by email
    const user = await User.findOne({ email: email });
    if (!user) {
        throw { status: 400, message: "Email is incorrect" };
    }

    // Ensure OTP exists in the user document
    if (!user.resetPasswordOtp || !user.otpExpires) {
        throw { status: 400, message: "OTP not found or expired" };
    }


    const currentTime = new Date();

    // Check if OTP is valid and not expired
    if (currentTime <= user.otpExpires && user.resetPasswordOtp === otp) {
       
        const hashedPassword = await bcrypt.hash(new_password, 10);

        // Update user's password
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                $set: {
                    pass: hashedPassword,
                },
            },
            { new: true }
        );

        if (!updatedUser) {
            throw { status: 500, message: "Internal error occurred while updating password" };
        }

        return { message: "Password has been successfully reset" };
    } else if (currentTime > user.otpExpires) {
        throw { status: 400, message: "OTP has expired" };
    } else {
        throw { status: 400, message: "Invalid OTP" };
    }
};

module.exports = { user_forgotpassword, user_resetPassword};
