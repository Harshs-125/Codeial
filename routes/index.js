const express=require('express');
const router = express.Router();
const homeController=require('../controller/home_controller');
const postController=require('../controller/post_controller');
const userController=require('../controller/user_controller')
router.get('/',homeController.home);
router.get('/posts',postController.posts);
router.use('/users',require('./users'))
router.get('/signin',userController.signin);
router.get('/signup',userController.signup);

console.log("router loaded");
module.exports=router;