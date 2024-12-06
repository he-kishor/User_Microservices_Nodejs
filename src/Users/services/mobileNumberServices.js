const User = require('../models/user_models')


//update mobile number 
// ftech mobile number 
// ftech ID from the token 
// update the mobile number

const update_mobilenumber = async(u_id,mobilenumber)=>{
     // Step 1: Validate the mobile number format
     const isValidFormat = /^\+[1-9]\d{0,1}\d{10}$/.test(mobilenumber);

    if (!isValidFormat) {
        throw { status: 400, message: "Invalid mobile number format" };
    }

    // Step 2: Find user by ID
    const user = await User.findOne({ _id: u_id });
    if (!user) {
        throw { status: 401, message: "Invalid User" };
    }

    try {
        // Step 3: Update the user's mobile number
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $set: { mobilenumber: mobilenumber } },
            { new: true, runValidators: true } //  ensure that even schema validation also check while updating the number
        );

        return { message: "Number has been updated" };
    } catch (error) {
        if (error.name === "ValidationError") {
            throw { status: 400, message: "Invalid mobile number format" };
        } else {
            console.error("Internal server error:", error); // Log the error for debugging
            throw { status: 500, message: "An internal error has occurred" };
        }
    }
}

//login with mobile and password then they will receive the otp 

// for inter mobile number
// check the mobile in the system
// match with send the otp using mobile number


 module.exports = { update_mobilenumber }