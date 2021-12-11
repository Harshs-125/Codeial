const nodemailer=require('../config/NodeMailer');

exports.newComment=(comment)=>{
        console.log("inside newComment mailer");
        nodemailer.transporter.sendMail({
            from:'harshdvlpr@gmail.com',
            to:comment.user.email,
            subject:"new Comment published",
            html:"<h1>You commented on a post and its published</h1>"
        },(err,info)=>{
            if(err)
            {
                console.log("Err in sending mails",err);
                return; 
            }else{
                console.log("Mail delivered",info);
                return;
            }
        })
}