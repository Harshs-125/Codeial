const nodemailer=require('../config/NodeMailer');

exports.newComment=(comment)=>{
        let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs');
        nodemailer.transporter.sendMail({
            from:'harshdvlpr@gmail.com',
            to:comment.user.email,
            subject:"new Comment published",
            html:htmlString
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