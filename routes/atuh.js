const express = require('express');
const router = express.Router();

const {
    login,
    signUp,
    sendOtp 
} = require('../controllers/auth');


// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

// Route for user login
router.post("/login", login)

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendOtp", sendOtp)

module.exports = router