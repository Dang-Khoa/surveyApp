const nodemailer = require('nodemailer');
const mailer = require('./mailer');

module.exports = class registrationLinkMailer extends mailer {
    constructor(linkName, targetEmail) {
        super(linkName, targetEmail);

        this.mailOptions.subject = 'Registrationslink'
        this.mailOptions.text = 'Link zur Registration für die Umfrage App: \n\n' +
            'Registrationslink: ' + this.linkName
    }
}