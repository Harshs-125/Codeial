const express=require('express');
const router = express.Router();
const postApi=require('../../../controller/api/v1/post_api');
const passport=require('passport');
router.get('/',postApi.post);
router.delete('/deletepost/:id',passport.authenticate('jwt',{session:false}),postApi.deletePost);

module.exports=router;