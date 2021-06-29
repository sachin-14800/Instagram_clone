const express=require('express');
const passport=require('passport');
const router=express.Router();

const userController=require('../controllers/user_controller');
router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.get('/edit-profile',passport.checkAuthentication,userController.editProfile);
router.post('/update/:id',passport.checkAuthentication,userController.update);
router.get('/new-post',passport.checkAuthentication,userController.newPost);
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);

router.post('/create',userController.create);
router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect:'/user/sign-in'
    },
),userController.createSession);

router.get('/sign-out',userController.destroySession);

// google authentiaction
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/user/sign-in'}), userController.createSession);

//forget-password
router.get('/forget',userController.forget);
router.post('/forget-password',userController.createToken);
router.get('/new-password/:id',userController.newPassword);
router.post('/update-password',userController.updatePassword);
module.exports=router;