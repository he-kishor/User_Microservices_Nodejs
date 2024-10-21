
const  {registerUser, loginuser, updateuser,updatePassword} = require('../services/user_service');
const errorHandler = require('../../../Shared/errorHandler');
const {user_forgotPassword } = require('../services/forgotPassword');
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
module.exports ={user_register, login_user, update_user, update_password};