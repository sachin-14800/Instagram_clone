const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');
const env=require('./environment');
//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:"447272185747-hav5i0hdvmtf1rf2o9fvlddu8sd24a77.apps.googleusercontent.com",  //env.google_client_id
    clientSecret:"N9MgTsxuD2kuy_-1SHnQfDAa", //env.google_client_secret
    callbackURL:"http://localhost:8000/user/auth/google/callback", //env.google_call_back_url
    },

    function(accessToken,refreshToken,profile,done)
    {
        //find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err)
            {
                console.log(err);
                return;
            }
            console.log(profile);
            if(user)
            {
                //if found set this user as req.user
                return done(null,user);

            }
            else
            {
                // if not found create the user and set it as req.user
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err)
                    {
                        console.log(err);
                        return;
                    }
                    return done(null,user);
                });
            }
        });
    }
));

module.exports=passport;