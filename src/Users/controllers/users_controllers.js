
const  {registerUser, loginuser, updateuser,updatePassword} = require('../services/user_service');
const { user_forgotpassword, user_resetPassword} = require('../services/forgotPassword');
const errorHandler = require('../../../Shared/errorHandler');

//user register

const user_register = async (req, res) => {
try {
    const userResponse= await registerUser(req.body);
    res.status(201).json(userResponse);
} catch (error) {
    errorHandler(res,error);
   }
};


const login_user=async(req,res)=>{
  try{
    const loginresponse = await loginuser(req.body);
    res.status(201).json(loginresponse);
        
       
    }
    catch(error){
        errorHandler (res,error);
   }

    
};

const update_user = async(req,res)=>{
    try{
    const id=req.userid;
    const u_users = await updateuser(id, req.body);
    res.status(201).json({u_users});
    }
    catch(error){
        errorHandler(res,error);
    }

};

//const update password

const  update_password = async(req,res)=>{
    try{
        const id = req.userid;
        const U_message = await updatePassword(id,req.body);
        res.status(201).json(U_message)
    }
    catch(error){
        errorHandler (res,error);
    }
};

// const forgot_password
const forgot_password = async(req,res)=>{
    try{
    const email = req.body.email;
    if(!email){
        res.status(400).json({message:"Provide email"});
    }
    const response = await user_forgotpassword(email);
    res.status(200).json(response)
   }
   catch(error){
        errorHandler(res,error);
   }
};

const reset_password = async(req,res)=>{
    try{
        const { email, new_password, confirm_password, otp } = req.body;
        const response = await user_resetPassword({ email, new_password, confirm_password, otp });
        return res.status(200).json(response);

    }
    catch(error){
        errorHandler(res,error);
    }
}

module.exports ={user_register, login_user, update_user, update_password, forgot_password, reset_password};