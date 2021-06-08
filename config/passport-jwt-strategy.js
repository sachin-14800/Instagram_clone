const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
//extract JWT from header
const ExtractJWT=require('passport-jwt').ExtractJwt;
const User=require('../models/user');
//header has list of keys has key authorisation and that also has list of keys and key named bearer having the JWT token
let opts={
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey:'Instagram'
}

passport.use(new JWTStrategy(opts,function(JwtPayLoad,done){
    User.findById(JwtPayLoad._id,function(err,user){
        if(err)
        {
            console.log('Error in finding user');
            return ;
        }
        if(user)
        {
            return done(null,user);
        }
        else
        {
            return done(null,false);
        }
    });
}));

module.exports=passport;