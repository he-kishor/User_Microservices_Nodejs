const User = require('../models/user_models');

const check_user = async(uid)=>{
    const user_data = await User.findById(uid);

        // Handle if user is not found
        if (!user_data) {
            throw { status: 400, message: "User does not exist" };
        }

        // Return the user data if `pass` is not present
        if (!user_data.pass) {
            return user_data;
        }


        const userPlainObject = user_data.toObject(); // Convert Mongoose document to plain object
        delete userPlainObject.pass;
        delete userPlainObject.passwordChangedAt;
        delete userPlainObject.otpExpires;
        delete userPlainObject.resetPasswordOtp;
        delete userPlainObject.refreshToken;

        return userPlainObject;

    
    


}

module.exports = check_user;