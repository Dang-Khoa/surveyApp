const e = require('cors');
const controllerInterface = require('./controllerInterface');
const { hashPassword, verifyPassword } = require('./authUtil');

module.exports = class userController extends controllerInterface {
    constructor() {
        super();
    }

    getUserContent = (req, res) => {
        res.status(200).json({ message: "User Content." });
    };

    // expects: surveyEvent, surveyResults (and auth header)
    saveSurvey = (req, res) => {
        this.storageAccess.saveSurvey(req.user, req.body.surveyEvent, req.body.surveyResults, function(err, data) {
            if (err) 
                res.status(400).json({ error: err });
            else {
                res.status(200).json({ message: 'Umfrage wurde erfolgreich gesendet.' });
            }
        });
    };

    // expects: surveyForm, surveyEvent (and auth header)
    getSurvey = (req, res) => {
        this.storageAccess.getSurvey(req.user, req.body.surveyForm, req.body.surveyEvent, function(err, data) {
            if (err) 
                res.status(400).json({ error: err });
            else if (data) 
                res.status(200).json({ data: data , message: 'Umfragedaten erfolgreich geladen.'});
            else 
                res.status(403).json({ error: 'Interner Fehler.' });
        })
    }

    // expects: oldPassword, newEmail
    changeEmail = (req, res) => {
        var newUserData = { 'email' : req.body.newEmail}

        this.changeCredentials(req.user, req.body.oldPassword, newUserData, function(err, data) {
            console.log(err, data);
            if (err) 
                return res.status(400).json({ error: err });
            else if (data) 
                return res.status(200).json({ data: data , message: 'Email wurde erfolgreich geändert.'});
            else 
                return res.status(403).json({ error: 'Interner Fehler.' });
        })
    }

    // expects: oldPassword, newUsername
    changeUsername = (req, res) => {
        var newUserData = { 'username' : req.body.newUsername}

        this.changeCredentials(req.user, req.body.oldPassword, newUserData, function(err, data) {
            if (err) 
                return res.status(400).json({ error: err });
            else if (data) 
                return res.status(200).json({ data: data , message: 'Benutzername wurde erfolgreich geändert.'});
            else 
                return res.status(403).json({ error: 'Interner Fehler.' });
        })
    }

    // expects: oldPassword, newPassword
    changePassword = (req, res) => {
        var newUserData = { 'password_hash' : hashPassword(req.body.newPassword) }

        this.changeCredentials(req.user, req.body.oldPassword, newUserData, function(err, data) {
            if (err) 
                return res.status(400).json({ error: err });
            else if (data) 
                return res.status(200).json({ data: data , message: 'Passwort wurde erfolgreich geändert.'});
            else 
                return res.status(403).json({ error: 'Interner Fehler.' });
        })
    }

    changeCredentials = (user, oldPassword, newUserData, callback) => {
        var that = this;
        this.storageAccess.findUser('patientcode', user.patientcode, async function(err, user) {
            if (user) {
                const passwordValid = await verifyPassword( oldPassword, user.password_hash );
                if (passwordValid) {
                    that.storageAccess.setNewUserData(user, newUserData, function(err, data) {
                        if (err) 
                            return callback(err);
                        else if (data) 
                            return callback(null, data);
                        else 
                            return callback(err);
                    })
                }
                else {
                    return callback('Passwort ungültig.')
                }
            }
            else
                return callback('Interner Fehler.')
        });
    }
}