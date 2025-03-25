const express = require('express');
const { register, login, logout,verifyEmail,sendVerifyOtp,resetOTP,resetOtpVerify,resetPassword, isAuthenticated ,myProfile } = require('../controllers/UserController.js')
const {userAuth,authenticateUser} = require('../Middleware/Auth.js')

const authRoutes = express.Router();

authRoutes.post('/register', register);
authRoutes.post('/login',login);
authRoutes.post('/sendotp',userAuth,sendVerifyOtp);
authRoutes.post('/verify-otp',userAuth,verifyEmail);
authRoutes.post('/authenticate',authenticateUser,isAuthenticated);
authRoutes.get('/profile',userAuth,myProfile);
authRoutes.post('/send-resetotp',resetOTP);
authRoutes.post('/verify-reset-otp',resetOtpVerify)
authRoutes.post('/reset-password',resetPassword);
authRoutes.post('/logout',logout);


module.exports = authRoutes;
