const express=require('express');
const router=express.Router();
const followController=require('../controllers/follow_controller');

router.post('/toggle',followController.toggleFollow);
module.exports=router;