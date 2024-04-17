const nodemailer = require('nodemailer');
const mailer = require('./mailer');

module.exports = class resetPasswordMailer extends mailer {
    constructor(token, targetEmail) {
        super('', targetEmail);
        this.token = token;

        this.mailOptions.subject = 'Zurücksetzung des Passwortes'
        this.mailOptions.text = 'Der Token zum Zurücksetzen des Passwortes: \n\n' +
            'Token: ' + this.token
    }
}