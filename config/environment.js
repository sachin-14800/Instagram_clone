const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const logDirectory=path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory)|| fs.mkdirSync(logDirectory);

const accessLogStream=rfs.createStream('access.log',{
  interval:'1d',
  path:logDirectory
});

const development={
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'instagram_clone',
    smtp:{
        service:'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
          user: "use your own",
          pass: "abcd", 
        }
      },
    google_client_id:"447272185747-hav5i0hdvmtf1rf2o9fvlddu8sd24a77.apps.googleusercontent.com",
    google_client_secret:"N9MgTsxuD2kuy_-1SHnQfDAa",
    google_call_back_url:"http://localhost:8000/user/auth/google/callback",
    jwt_secret:'Instagram',
    morgan:{
      mode:'dev',
      options:{stream:accessLogStream}
    }
}

const production={
    name:'production',
    asset_path:process.env.INSTAGRAM_CLONE_ASSET_PATH,
    session_cookie_key:process.env.INSTAGRAM_CLONE_SESSION_COOKIE,
    db:process.env.INSTAGRAM_CLONE_DB,
    smtp:{
        service:'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
          user: process.env.INSTAGRAM_CLONE_GMAIL_USERNAME,
          pass: process.env.INSTAGRAM_CLONE_GMAIL_PASSWORD, 
        },
      },
    google_client_id:process.env.INSTAGRAM_CLONE_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.INSTAGRAM_CLONE_GOOGLE_CLIENT_SECRET,
    google_call_back_url:process.env.INSTAGRAM_CLONE_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.INSTAGRAM_CLONE_JWT_SECRET,
    morgan:{
      mode:'combined',
      options:{stream:accessLogStream}
    }
}

module.exports=eval(process.env.INSTAGRAM_CLONE_ENVIRONMENT)==undefined ? development :eval(process.env.INSTAGRAM_CLONE_ENVIRONMENT);