const jwt=require('jsonwebtoken');
const authenticate =(req,res,next)=>{
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({message:"Access Denied"});
        }

    jwt.verify(token,process.env.jwtsecrettoken,(err,user)=>{
        if (err){
            return res.status(403).json({message:'Invalid token'});

        }

        req.userid=user.id;
        next();
    })


};

const logger =(req,res,next)=>{
    console.log(`Logger2: ${req.method} Request recieved on ${req.url}`);
    next();
};
module.exports={authenticate, logger};