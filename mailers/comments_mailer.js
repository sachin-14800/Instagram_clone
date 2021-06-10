const nodemailer = require('../config/nodemailer');
const nodeMailer=require('../config/nodemailer');

exports.newComment=(comment)=>{
    console.log("inside new comment mailer",comment);
    nodemailer.transporter.sendMail({
        from:'acquireurattire@gmail.com',
        // in case of post it will comment.post.user.email
        to:comment.user.email,
        subject:'New comment published !',
        html:'<h1>Yup ,your comment is now published</h1>'
    },(err,info)=>{
        if(err)
        {
            console.log('Error in sending mail',err);
            return ;
        }
        console.log('Message send:',info);
        return ;
    });
}