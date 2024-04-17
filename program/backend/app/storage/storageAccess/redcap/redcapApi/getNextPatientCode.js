const exportRecord = require('./exportRecord');
const post = require('./post');

module.exports = function(patientcode, callback) {
    var nextPatientcode = 1700001;
    var searchCriteria = { 
        forms: 'user_auth',
        events: 'user_auth_arm_1',
        fields: 'patientcode'
    }

    exportRecord(searchCriteria, function(err, data) {
        var patientcodeArr = []
        if (data && Array.isArray(data) && data.length) {
            for (let i = 0; i < data.length; i++) {
                patientcodeArr.push(data[i].patientcode)
            }

            patientcodeArr = patientcodeArr.sort(function (a, b) { return a - b });
            if(patientcode) {
                var patientcodeIsValid = true;
                for (let i = 0; i < patientcodeArr.length; i++) {
                    if(patientcode === patientcodeArr[i]) 
                        return callback('Patienten-ID bereits vergeben.');
                }
                if(patientcodeIsValid)
                    return callback(null, patientcode)
            }
            else {
                for (let i = 0; i < patientcodeArr.length; i++) {
                    if(getPatientcodeStringFormat(nextPatientcode) === patientcodeArr[i])
                        nextPatientcode += 1;
                    else if(getPatientcodeStringFormat(nextPatientcode) < patientcodeArr[i])
                        break;
                }
                return callback(null, getPatientcodeStringFormat(nextPatientcode));
            }
        }
        else {
            return callback('Interner Fehler.', null);
        }
    })
}

getPatientcodeStringFormat = function(patientcode) {
    patientcodeStr = patientcode.toString()
    return patientcodeStr.slice(0, 4) + '.' + patientcodeStr.slice(4);
}