const express = require('express');
const router = express.Router();

const {
    login,
    signUp,
    sendOtp 
} = require('../controllers/auth');
const { updateProfile, updateProfileImg, addAddress, deleteAddress, updateAddress, chengePassword } = require('../controllers/profile');


// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendOtp", sendOtp)

//********************************************************************************************************
//                                     {Profile} routes
// ********************************************************************************************************

//update profile
router.post("/updateProfile",updateProfile)
// routes for updating profile img
router.post("/updateProfileImg",updateProfileImg);
// address adding route
router.post("/addAddress",addAddress);
// delte user address
router.post("/deleteAddres",deleteAddress);
// edit address
router.post("/editAddress",updateAddress)
//routes for updating password
router.post("/updatePassword", chengePassword)

module.exports = router