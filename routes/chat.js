const express=require('express');
const passport = require('passport');
const router=express.Router();

const chatController=require('../controllers/chat_controller');

router.get('/:id',passport.checkAuthentication,chatController.chat);
router.get('/',passport.checkAuthentication,chatController.chatting);
module.exports=router;