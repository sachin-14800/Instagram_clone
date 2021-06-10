const nodeMailer=require('../config/nodemailer');
exports.generateLink=(object)=>{
    let htmlString=nodeMailer.renderTemplate({object:object},'/forget/forget_password.ejs');
    nodeMailer.transporter.sendMail({
        from:'acquireurattire@gmail.com',
        to:object.user.email,
        subject:'Change your password',
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