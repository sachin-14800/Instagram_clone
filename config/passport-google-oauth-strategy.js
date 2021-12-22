//module for passport
const passport=require('passport');

//for creating a google strategy
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;

//for generating random string
const crypto=require('crypto');

//user model
const User=require('../models/user');

const env=require('./environment');

//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:env.google_client_id,
    clientSecret:env.google_client_secret,
    callbackURL:env.google_call_back_url
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

            if(user)
            {
                //if found set this user as req.user
                return done(null,user);

            }
            else
            {
                // if not found create the user fetching all the necessary details and set it as req.user
                User.create({
                    avatar:profile.photos[0].value,
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err)
                    {
                        console.log(err);
                        return;
                    }
                    //setting the user as req.user
                    return done(null,user);
                });
            }
        });
    }
));

//exporting the passport strategy
module.exports=passport;