// services/users/routes/user_routes.js
const express = require('express');
const {authenticate,authenticateheader} = require('../../../setups/middleware')
const { user_register, login_user ,update_user,  update_password,forgot_password, reset_password, update_MobileNuber} = require('../controllers/users_controllers');
const {refresh_Token} =require('../Token_utilis/refreshtoken')
const {checkuser} = require('../controllers/check_userControllers')
const router = express.Router();

//refresh token
router.post('/refreshtoken',refresh_Token);
//checkuser
router.get('/check_user',authenticateheader,checkuser);

router.post('/signup', user_register);
router.post('/login', login_user);
router
router.put('/updateusers',authenticate,update_user);
router.put('/updatepassword',authenticate,update_password);

//for got password
router.post('/forgotpasswords',forgot_password);
router.post('/resetpasswordotps',reset_password)

//mobile number

router.put('/updatemobile',authenticate,update_MobileNuber);


module.exports = router;
