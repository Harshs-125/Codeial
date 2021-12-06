const express=require('express');
const router = express.Router();
const homeController=require('../controller/home_controller');
router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comment',require('./comment'));

router.use('/api',require('./api'));
console.log("router loaded");
module.exports=router;