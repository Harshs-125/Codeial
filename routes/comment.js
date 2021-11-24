const express=require('express');
const router=express.Router();
const passport=require('../config/passport-local-strategy');
const commentController=require('../controller/comment_controller');

router.post('/createcomment',passport.checkAuthentication,commentController.createComment);

module.exports=router;
