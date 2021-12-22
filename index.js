//port number
const port=8000;
//module for express 
const express=require('express');

const env=require('./config/environment');
// const env=require('./config/environment');

//module for ejs layout for frontend
const expressEjsLayouts = require('express-ejs-layouts');

//module for cookies of the site
const cookieParser=require('cookie-parser');

//importing the config database file
const db=require('./config/mongoose');

//creating a new express app
const app=express();

//module for session of a particular user
const session=require('express-session');

//module for autentication
const passport=require('passport');

//module for local authentication imported for config
const passportLocal=require('./config/passport-local-strategy');

//module for jwt authentication imported from config
const passportJWT=require('./config/passport-jwt-strategy');

//importing module for google authentication from config
const passportGoogle=require('./config/passport-google-oauth-strategy');

//module for storing the session 
const MongoStore=require('connect-mongo');

//sass middle for converting scss to css
const sassMiddleware=require('node-sass-middleware');

//module for flashing up of messages
const flash=require('connect-flash');

//middleware for setting the flash message
const customMware=require('./config/middleware');

//necesaary imports for chatserver(Sockets)
const chatServer=require('http').Server(app);
const  chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
//chat server running on port 5000
chatServer.listen(5000);
console.log('Chat server is running on port 5000');

//path module
const path=require('path');

//telling express to use sass middleware
app.use(sassMiddleware({
    src:path.join(__dirname,env.asset_path,'scss'),
    dest:path.join(__dirname,env.asset_path,'css'),
    debug:true,
    outputStyle:'expanded',
    prefix:'/css',
}));

app.use(express.urlencoded());
//cookie parser
app.use(cookieParser());

//static files location
app.use(express.static(env.asset_path)); //path.join(__dirname,env.asset_path)
// make upload path available to the browser
app.use('/uploads',express.static(__dirname+'/uploads'));
//telling app to use express layouts
app.use(expressEjsLayouts);
//set script and style true for ejs layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//teling express for the different views
app.set('view engine','ejs');
app.set('views','./views');

//initialising the express session
app.use(session({
    name:'instagram',
    secret:env.session_cookie_key,   //env.session_cookie_key
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({
        mongoUrl:'mongodb://localhost/instagram_clone'
    })
}));

//initialising the passport and its session
app.use(passport.initialize());
app.use(passport.session());
//authenticating the user
app.use(passport.setAuthenticatedUser);

//using flash for displaying the messages
app.use(flash());

//setting flash messages using the custom midlleware
app.use(customMware.setFlash);

//adding different routes
app.use('/',require('./routes'));

//strating the express server
app.listen(port,function(err){
    if(err)
    {
        console.log(err);
    }
    console.log("Server is running successfully on port: ",port);
});