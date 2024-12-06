const jwt=require('jsonwebtoken');

const generateToken =(user)=>{

    return jwt.sign(
        {
            id:user._id,
            email:user.email,
            passwordChangedAt: Date.now()

        },
        process.env.jwtsecrettoken,
        {expiresIn: '10h'}
    );
};

module.exports = generateToken; 