const queue=require('../config/kue');
const forgetPasswordMailer=require('../mailers/forget_password_mailer');
queue.process('password',function(job,done){
    console.log(job.data);
    forgetPasswordMailer.generateLink(job.data);
    done();
});