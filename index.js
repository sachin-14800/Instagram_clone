const port=8000;
const express=require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const cookieParser=require('cookie-parser');
const db=require('./config/mongoose');
const app=express();
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');
const MongoStore=require('connect-mongo');
const sassMiddleware=require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assests/scss',
    dest:'./assests/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressEjsLayouts);
app.set('LayoutextractStyles',true);
app.set('LayoutextractScripts',true);
app.use(express.static('assests'));
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'instagram',
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({
        mongoUrl:'mongodb://localhost/instagram_clone'
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err)
    {
        console.log(err);
    }
    console.log("Server is running successfully on port: ",port);
});