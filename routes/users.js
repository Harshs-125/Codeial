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
router.get('/profile/:id',userController.profile);
router.get('/signout',userController.destroySession);
router.post('/update/:id',userController.update);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signin'}),userController.createsession);

module.exports=router;