const storageAccessInterface = require('../storageAccessInterface');
const User = require('../../models/userModel');
const { getPatientcode, checkDuplicateUsernameEmail } = require('./redcap/redcapUtil');

const exportRecord = require('./redcap/redcapApi/exportRecord'); 
const importRecord = require('./redcap/redcapApi/importRecord');
const getNewPatientCode = require('./redcap/redcapApi/getNextPatientCode');

module.exports = class redcapAccess extends storageAccessInterface {
    constructor() {
        super();
    }

    createUser(id, token, role, patientcode, childsBirthDay, callback) {
        getNewPatientCode(patientcode, function(err, data) {
            if (err) {
                return callback(err, null);
            }
            else if (data) {
                var accountRole = ['admin', 'user'].indexOf(role) > -1 ? role : 'user';
                var recordInfo = [{
                    redcap_event_name: 'user_auth_arm_1',
                    patientcode: data,
                    id: id,
                    role: accountRole,
                    token: token,
                    childs_birth_day: childsBirthDay
                }];

                importRecord(recordInfo, false, function(err, data) {
                    if (err) return callback(err, null);
                    else return callback(null, token);
                });
            }
            else return callback('Interner Fehler', null);
        });
    }

    findUser(key, value, callback) {
        var searchCriteria = {
            forms : 'user_auth',
            events : 'user_auth_arm_1',
            fields : 'patientcode'
        }

        exportRecord(searchCriteria, function(err, data) {
            if (err) {
                return callback(err, null);
            }
            else if (data && Array.isArray(data) && data.length) {
                for(var i = 0; i < data.length; i++) {
                    if(data[i].hasOwnProperty(key) && data[i][key] === value) {
                        let userInfo = {
                            id: data[i].id,
                            patientcode: data[i].patientcode,
                            email: data[i].email,
                            username: data[i].username,
                            password_hash: data[i].password_hash,
                            role: data[i].role,
                            childs_birth_day: data[i].childs_birth_day
                        }

                        var user = new User(userInfo);
                        return callback(null, user);
                    }
                }
            }
            return callback(null, null);
        });
    }

    // Save a new user with given user data,
    setUser(userData, newid, callback) {
        if(!userData.id)
            return callback('ID ungültig', null);

        getPatientcode({id : userData.id}, function(err, patientcode) {
            if (err) {
                return callback(err, null);
            }
            else if (patientcode) {
                console.log(userData)
                checkDuplicateUsernameEmail(userData.username, userData.email, function(err) {
                    if(err) return callback(err, null);
                    userData.patientcode = patientcode;
                    userData.id = newid;
                    var userRecord = [userData];
                    userRecord[0].user_auth_complete = 2;
                    userRecord[0].redcap_event_name = 'user_auth_arm_1'

                    importRecord(userRecord, false, function(err, data) {
                        if (err) {
                            return callback(err, null);
                        }
                        else if (data) {
                            var user = new User(userData);
                            return callback(null, user);
                        }
                        else {
                            return callback('Interner Fehler', null);
                        }
                    });               
                });
            }
            else return callback('Interner Fehler', null);
        });
    }

    setResetToken(user, resetToken, callback) {
        var recordData = [{
            patientcode : user.patientcode,
            redcap_event_name : 'user_auth_arm_1',
            token : resetToken
        }]
        importRecord(recordData, true, function(err, data) {
            if (err) 
                return callback(err, null);
            else if (data)
                return callback(null, null);
            else
                return callback('Interner Fehler.', null);
        })
    }

    setNewUserData(user, newUserData, callback) {
        newUserData.patientcode = user.patientcode;
        newUserData.redcap_event_name = 'user_auth_arm_1';
        var userRecord = [newUserData];

        importRecord(userRecord, false, function(err, data) {
            if (err) {
                return callback(err, null);
            }
            else if (data) {
                return callback(null, 'success');
            }
            else {
                return callback('Interner Fehler', null);
            }
        });               
    }

    // expected params format:
    //  [{key: a, value: b}, {key: x, value y}, ...]
    checkUserParams(params, callback) {
        var searchCriteria = { 
            forms: 'user_auth',
            events: 'user_auth_arm_1'
        }

        let valid = true;
        exportRecord(searchCriteria, function(err, data) {
            if (err) 
                return callback(err, null);
            else if (data && Array.isArray(data) && data.length) {
                for (let i = 0; i < data.length; i++) {
                    for (let j = 0; j < params.length; j++) {
                        if(!params[j].hasOwnProperty('key') || !params[j].hasOwnProperty('value'))
                            return callback('Invalide Parameter.');

                        if(param[j].key in data[i] && data[i][param[j].key] === param[j].value) {
                            valid = false; break;
                        }
                    }
                }
                if(valid)  
                    return callback(null, 'Angebene Daten sind gültig.')
                else 
                    return callback('Angegebene Daten sind ungültig.', null);
            }
            return callback('Angegebene Daten sind ungültig.', null);
        })
    }

    saveSurvey(user, surveyEvent, surveyJson, callback) {
        surveyJson[0].patientcode = user.patientcode;
        surveyJson[0].redcap_event_name = surveyEvent;
        importRecord(surveyJson, true, function(err, data) {
            if (err) {
                return callback(err, null);
            }
            else if (data)
                return callback(null, null);
            else
                return callback('Interner Fehler.', null);
        });
    }

    getSurvey(user, surveyForm, surveyEvent, callback) {
        var searchCriteria = {
            forms: surveyForm, 
            events: surveyEvent,
            records: user.patientcode
        }

        exportRecord(searchCriteria, function(err, data) {
            if (err)
                return callback(err, null);
            else if (data) 
                return callback(null, data);
            else
                return ('Interner Fehler.');
        })
    }

}