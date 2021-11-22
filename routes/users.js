const express=require('express');
const router=express.Router();
const passport=require('passport');
const userController=require('../controller/user_controller')

router.get('/signin',userController.signin);
router.get('/signup',userController.signup);
router.post('/create',userController.create);
//use passport as a middleware to authenticate
router.post('/createsession',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'},
),userController.createsession);
router.get('/profile',userController.profile);
router.get('/signout',userController.destroySession);
module.exports=router;