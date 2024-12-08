const errorHandler = require('../../../Shared/errorHandler');
const check_user = require('../services/check_authenticate');

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

module.exports ={checkuser}