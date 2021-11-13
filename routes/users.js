const express=require('express');
const router=express.Router();
const userController=require('../controller/user_controller')
const passport=require('passport');

router.get('/signin',userController.signin);
router.get('/signup',userController.signup);
router.post('/create',userController.create);
//use passport as a middleware to authenticate
router.post('/createsession',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},
),userController.createsession);
module.exports=router;