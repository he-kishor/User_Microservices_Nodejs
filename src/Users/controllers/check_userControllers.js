const errorHandler = require('../../../Shared/errorHandler');
const {check_user, loginuser} = require('../services/check_authenticate');

const checkuser = async(req,res)=>{
    try{
    const uid=req.userid;
    const user_data = await check_user(uid);
    res.status(200).json(user_data);
    }
    catch(error){
       errorHandler(res,error)
    }

};
const apilogin_user=async(req,res)=>{
    try{
      const loginresponse = await loginuser(req.body);
     
    
        
        res.status(201).json(loginresponse.user);
            
         
      }
      catch(error){
          errorHandler (res,error);
     }
}
module.exports ={checkuser, apilogin_user}