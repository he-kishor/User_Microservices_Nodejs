require('dotenv').config();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User = require('../models/user_models');

//register user
const registerUser = async({fname, lname, email, pass, role, gender})=> {
    if (!fname || !lname || !email || !role ){
        throw({status:400, mesaage:"Please provide all required fields"});

    }
    const genderr = gender || 'NO response'
    const hasedPassword = await bcrypt.hash(pass,10);
    const current_date=Date.now();
    const newuser = await User.create({fname, lname, email, pass:hasedPassword,  role, gender:genderr,passwordChangedAt:current_date});

    const userResponse = { ...newuser._doc};
    delete userResponse.pass;
    delete userResponse.passwordChangedAt;

    return userResponse //return user detail
}
 //login user
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

    const token= jwt.sign({id:user._id,email:user.email}, process.env.jwtsecrettoken,{expiresIn:'10h'});
    const currentdate=new Date();
    const user_up =await User.findByIdAndUpdate(
        user.id,

        {
            $set:{
                lastLoginAt:currentdate
            }
        },
            {new:true}

        );
    return {
        //response the json object to make all kind api helpful
        message:"Login Successfully",
        token,
        user:{
            u_id:user_up ._id,
            email:user_up .email,
            fname:user_up .fname,
            lname:user_up .lname,
            role:user_up .role,
            gender:user_up .gender,
            lastLoginAt:user_up.lastLoginAt
            
        }
    };


};

//updte user info
const updateuser = async(id,body) =>{

   try{

    const { email, fname, lname, gender } = body;
        
    if (!email || !fname || !lname  || !gender) {
            throw { status: 400, message: "All fields (email, fname, lname, role, gender) must be provided" };
        }
    const user_up =await User.findByIdAndUpdate(
            id,

            {
                $set:{
                    fname:fname,
                    lname:lname,
                    gender:gender
                }
            },
            {new:true}
        );
   
   return {
 
        u_id:user_up._id,
        email:user_up.email,
        fname:user_up.fname,
        lname:user_up.lname,
        role:user_up.role,
        gender:user_up.gender
    
   }
}
catch (error){
   throw error;
  }
   
};

//update password
const updatePassword = async(id,{email,old_pass, new_pass})=>{
    //checks
    if (!email || !old_pass || !new_pass ) {
        throw { status: 400, message: "All fields (email, old passs, new pass) must be provided" };
    }
    if (!new_pass) {
        throw { status: 400, message: "New password must be provided" };
    }
    if (old_pass === new_pass) {
        throw { status: 400, message: "New password must be different from the old password" };
    }
    const user = await User.findById(id);
     
    if (!user){
        throw({status:400,message:"Invalid User"});
    }
    pass_validators = await bcrypt.compare(old_pass,user.pass);

    if(!pass_validators){
        throw({status:401,message:"incorrect password"});
    }
    current_date = new Date();
    //update the password
    const new_haspassword = await bcrypt.hash(new_pass,10);
    const user_up = await User.findByIdAndUpdate(id, {
        $set:{
            pass:new_haspassword,
            passwordChangedAt:current_date

        }
        },
        {new:true}
     );

    return {
        message:"password update"
    }
}

module.exports = {registerUser, loginuser, updateuser, updatePassword};