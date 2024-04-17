const controllerInterface = require('./controllerInterface');
const RegistrationLinkMailer = require('../emailModules/registrationLinkMailer');
const { generateRandomId } = require('./authUtil');

module.exports = class adminController extends controllerInterface {
    constructor() {
        super()
    }

    createUser = async(req, res) => {
        console.log('asentuhna')
        const reservationId = generateRandomId();
        const reservationToken = Math.floor(1000 + Math.random() * 9000);
        this.storageAccess.createUser(reservationId, reservationToken, 'user', req.body.patientcode, req.body.childsBirthDay, function(err, data) {
            console.log(data, err);
            if (err) 
                return res.status(403).json({ message: 'Interner Fehler.' });
            else if (data) {
                var appUrl = req.body.appUrl + reservationId;
                var registrationLinkMailer = new RegistrationLinkMailer(appUrl, req.body.email);
                return registrationLinkMailer.sendMail(function(err, data) {
                    if (err)
                        return res.status(403).json({ message: err });
                    else if (data) 
                        return res.status(200).json({ message: data });
                    else
                        return res.status(403).json('Interner Fehler.');
                });
            }
        });
    }

    createAdmin = async(req, res) => {
        const reservationId = generateRandomId();
        const reservationToken = Math.floor(1000 + Math.random() * 9000);
        this.storageAccess.createUser(reservationId, reservationToken, 'admin', req.body.patientcode, '', function(err, data) {
            if (err) 
                return res.status(403).json({ error: 'Interner Fehler.' });

            var appUrl = req.body.appUrl + reservationId;
            var registrationLinkMailer = new RegistrationLinkMailer(appUrl, req.body.email);
            return registrationLinkMailer.sendMail(function(err, data) {
                console.log(err, data);
                if (err)
                    return res.status(403).json({ error: err });
                else if (data) 
                    return res.status(200).json({ message: data });
                else
                    return res.status(403).json('Interner Fehler.');
            });
        });
    }
}