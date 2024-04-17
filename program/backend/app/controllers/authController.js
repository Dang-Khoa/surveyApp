const jwtDecode = require('jwt-decode');

const controllerInterface = require('./controllerInterface');
const ResetPasswordMailer = require('../emailModules/resetPasswordMailer');
const { createToken, hashPassword, verifyPassword, generateRandomId } = require('./authUtil');
module.exports = class authController extends controllerInterface{
    constructor() {
        super()
    }

    // expects: email, username, password, token
    signup = async (req, res) => {
        var userId = req.body.userId;
        var email = req.body.email.toLowerCase();
        var username = req.body.username.toLowerCase();
        var passwordHash = await hashPassword( req.body.password );

        const userData = {
            id: userId,
            email: email,
            username: username,
            password_hash: passwordHash,
            token: '',
            role: 'user',
        };
        const new_id = generateRandomId();
        
        this.storageAccess.setUser(userData, new_id, function(err, user) {
            if(err) {
                return res.status(400).json({ error: err });
            }
            else if (user) {
                const token = createToken(user);
                const expiresAt = jwtDecode(token).exp;
                const userInfo = { 
                    email: user.email,
                    username: user.username,
                    role: user.role
                }

                return res.status(200).json({ message: 'Benutzer erfolgreich registriert.', token, userInfo, expiresAt});
            }
            else {
                return res.status(403).json({ error: 'Benutzeraccount konnte nicht erstellt werden! '})
            }
        });
    }

    // expects: username, passwor
    signin = async (req, res) => {
        const username = req.body.username.toLowerCase();
        const password = req.body.password;

        this.storageAccess.findUser('username', username, async function(err, user) {
            (user);
            if (user) {
                const passwordValid = await verifyPassword( password, user.password_hash );
                if (passwordValid) {
                    const token = createToken(user);
                    const expiresAt = jwtDecode(token).exp;
                    const userInfo = { 
                        email: user.email,
                        username: user.username,
                        role: user.role,
                        childs_birth_day: user.childs_birth_day
                    }
                    return res.status(200).json({ message: 'Benutzer erfolgreich angemeldet.', token, userInfo, expiresAt});
                }
                return res.status(403).json({ error: 'Bentzername oder Password ungültig.' });
            }
            else
                return res.status(403).json({ error: 'Benutzername oder Password ungültig.' });
        });
    }    

    // expects: email, linkName
    resetPassword = (req, res) => {
        const that = this;
        var email = req.body.email.toLowerCase();
        this.storageAccess.findUser('email', email, function(err, user) {
            if (err) {
                return res.status(400).json({ error: err })
            }
            else if (!user) {
                return res.status(400).json({ error: 'Email ungültig.' });
            }
            else if (user) {
                var resetToken = Math.floor(1000 + Math.random() * 9000);
                that.storageAccess.setResetToken(user, resetToken, function(err, data) {
                    if (err) 
                        return res.status(400).json({ error: err})
                    else {
                        const resetPasswordMailer = new ResetPasswordMailer(resetToken, req.body.email);
                        return resetPasswordMailer.sendMail(function(err, data) {
                            if (err)
                                return res.status(403).json({ error: err });
                            else if (data) 
                                return res.status(200).json({ message: 'Zurücksetzung des Passwortes erfolgreich angefordert.'});
                            else
                                return res.status(403).json({ error: 'Interner Fehler.' });
                        });
                    }
                })
            }
            else {
                return res.status(403).json({ message: 'Interner Fehler' });
            }
        });
    }

    // expects: token
    checkToken = (req, res) => {
        var params = {
            'token': req.body.token,
            'user_auth_complete': 0,
        }

        this.storageAccess.checkUserParams(params, function(err, user) {
            if(user) {
                return res.status(200).json({ message: 'Token ist gültig.'})
            }
            else {
                return res.status(200).json({ message: 'Token ist ungültig.'});
            }
        })
    }

    // expects: userId
    checkUserId = (req, res) => {
        var params = {
            'id': req.body.userId,
            'user_auth_complete': 0,
        }

        this.storageAccess.checkUserParams(params, function(err, user) {
            if(user) {
                return res.status(200).json({ message: 'UserId ist gültig.'})
            }
            else {
                return res.status(200).json({ message: 'UserId ist ungültig.'});
            }
        })
    }

    // expects: password, token
    setNewPassword = async (req, res) => {
        var passwordHash = await hashPassword( req.body.password );
        var newUserData = {
            password_hash: passwordHash,
            token: '0000',
            id: generateRandomId() 
        }

        var that = this;
        this.storageAccess.findUser('token', req.body.token, function(err, user) {
            if(err) {
                res.status(403).json({ error: 'Accounterstellung fehlgeschlagen.'});
            }
            else if (user){
                that.storageAccess.setNewUserData(user, newUserData, function(err, data) {
                    if (err) {
                        return res.status(400).json({ error: err });
                    }
                    else if (data) {
                        return res.status(200).json({ message: 'Passwort wurde erfolgreich geändert.' })
                    }
                    else {
                        return res.status(403).json({ error: 'Interner Fehler' });
                    }
                });               
            }
            else {
                return res.status(403).json({ error: 'Interner Fehler.' })
            }
        })
    }
}