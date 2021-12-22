//module for sending the emails
const nodemailer = require("nodemailer");

//module for ejs
const ejs=require('ejs');
const path=require('path');

const env=require('./environment');


//how the communication will take place
let transporter = nodemailer.createTransport(env.smtp); //env.smtp

  //which path file is to be rendered when an email is send
let renderTemplate= (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,function(err,template)
        {
            if(err)
            {
                console.log('Error in rendering template');
                return ;
            }
            mailHTML=template;
        }
    )
    return mailHTML;
}

//exporting the required credentials
module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}