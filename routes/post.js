const express=require('express');
const router=express.Router();
const passport = require('passport');


const postController=require('../controllers/post_controller');
router.get('/:id',passport.checkAuthentication,postController.display);
router.post('/create',passport.checkAuthentication,postController.create);

router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);
module.exports=router;