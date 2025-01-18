const jwt=require('jsonwebtoken');
const authenticate =(req,res,next)=>{
    
    const token = req.cookies.authToken; 
    if (!token) {
        return res.status(401).json({message:"Access Denied"});
        }

    jwt.verify(token,process.env.jwtsecrettoken,(err,user)=>{
        if (err){
            return res.status(403).json({message:'Invalid token'});

        }

        req.userid=user.id;
        req.headers.authorization = `Bearer ${token}`;
        next();
    });


};

const authenticateheader =(req,res,next)=>{
    
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
    });


};

const verifyAccessToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access token missing' });

    jwt.verify(token, process.env.jwtsecrettoken, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired access token' });
        }

        req.userId = user.id;  // User ID from access token
        next();
    });
};

const logger =(req,res,next)=>{
    console.log(`Logger2: ${req.method} Request recieved on ${req.url}`);
    next();
};
module.exports={authenticate, logger, verifyAccessToken, authenticateheader};