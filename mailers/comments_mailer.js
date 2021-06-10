const nodemailer = require('../config/nodemailer');
const nodeMailer=require('../config/nodemailer');

exports.newComment=(comment)=>{
    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
    nodemailer.transporter.sendMail({
        from:'acquireurattire@gmail.com',
        // in case of post it will comment.post.user.email
        to:comment.user.email,
        subject:'New comment published !',
        html:htmlString
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