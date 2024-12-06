require('dotenv').config();
const { response } = require('express');
const User=require('../models/user_models');
const jwt =require('jsonwebtoken');

const refresh_Token = async(req,res)=>{
    const {refresh_tokenId} = req.body;
    if(!refresh_tokenId){
        return res.status(401).json({message:"Refresh Token Missing"});
    }
    //Verify the refresh token
    jwt.verify(refresh_tokenId, process.env.jwtsecrettoken,async(err,decode)=>{
        if(err){
           return res.status(403).json({message:"Invalid Refresh Token"});
        }
        
        const user =await User.findById(decode.id);
        if(!user ||  user.refreshToken !== refresh_tokenId){
            return res.status(403).json({message:"Invalid Refresh token"});
        }

        // generate the new access and refresh token 
        const newAccessToken = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.jwtsecrettoken,
            { expiresIn: '4h' }
        );
        const refreshTokenn = jwt.sign(
            { id: user._id },
            process.env.jwtsecrettoken,
            { expiresIn: '30d' } // Set a longer expiration for the refresh token
        ); 

         // update the user token
        const userUpdate = await User.findByIdAndUpdate(
            user.id,
            {
                $set:{
                    refreshToken:refreshTokenn
                }
            },
            {new:true}
        );

        return res.status(200).json({accessToken:newAccessToken, newrefreshToken:refreshTokenn});

    });

    
   
};

module.exports = {refresh_Token};