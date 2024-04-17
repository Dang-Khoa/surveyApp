const nodemailer = require('nodemailer');

module.exports = class mailer {
    constructor(linkName, targetEmail) {
        this.serverEmail = process.env.SERVER_EMAIL;
        this.emailPassword = process.env.EMAIL_PASSWORD
        this.linkName = linkName;
        this.targetEmail = targetEmail;

        this.smtpTransport = nodemailer.createTransport({  
            service: 'gmail',  
            auth: {  
                user: this.serverEmail,  
                pass: this.emailPassword 
            }  
        });  

        this.mailOptions = {
            from: this.serverEmail,  
            to: this.targetEmail, 
            subject: 'Registrationslink',  
            text: 'Link zur Registration für die Umfrage App: \n\n' +
                'Registrationslink: ' + this.linkName
        }
    }

    sendMail(callback) {
        this.smtpTransport.sendMail(this.mailOptions, function(err) {                 
            if (err)
                return callback(err, null);
            return callback(null, 'Email wurde gesendet.');
        });  
    }
}