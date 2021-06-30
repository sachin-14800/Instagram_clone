const express=require('express');

const router=express.Router();

const homeController=require('../controllers/home_controller');

router.get('/',homeController.home);
router.use('/user',require('./user'));
router.use('/post',require('./post'));
router.use('/comment',require('./comment'));
router.use('/like',require('./like'));
router.use('/follow',require('./follow'));
router.use('/chat',require('./chat'));
router.use('/api',require('./api'));
module.exports=router;