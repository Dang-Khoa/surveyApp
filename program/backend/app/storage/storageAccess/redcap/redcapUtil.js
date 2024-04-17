const exportRecord = require('./redcapApi/exportRecord');

exports.getPatientcode = (credentials, callback) => {
    var searchCriteria = {
        forms: 'user_auth',
        fields: 'patientcode'
    }

    exportRecord(searchCriteria, function(err, data) {
        if (err) {
            return callback(err, null);
        }
        else if (data && Array.isArray(data) && data.length) {
            for(let i = 0; i < data.length; i++) {
                let isInvalid = true;
                for(var key in credentials){
                    if (data[i][key].toString() === credentials[key].toString()) {
                        isInvalid = false
                    }
                }
                if (!isInvalid)
                    return callback(null, data[i].patientcode);
            }
            return callback('Account ist nicht verfügbar.', null);
        }
        else return callback('Interner Fehler', null);
    });
}

exports.checkDuplicateUsernameEmail = (username, email, callback) => {
    var searchCriteria = {
        'forms' : 'user_auth'
    }

    exportRecord(searchCriteria, function(err, data) {
        if (err) {
            return callback(err, null);
        }
        else if (data && Array.isArray(data) && data.length) {
            for(let i = 0; i < data.length; i++) {
                if (data[i].username === username)
                    return callback('Benutzername bereits vergeben.', null);
                else if (data[i].email === email)
                    return callback('E-mail bereits vergeben.', null);
            }
            return callback(null);
        }
        else return callback('Interner Fehler', null);
    });
}