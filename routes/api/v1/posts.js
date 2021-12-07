const express=require('express');
const router = express.Router();
const postApi=require('../../../controller/api/v1/post_api');
router.get('/',postApi.post);
router.delete('/deletepost/:id',postApi.deletePost);

module.exports=router;