const post = require('./post');

module.exports = function(jsonSurveyRecord, do_overwrite, callback) {
    var data = {
        content: 'record',
        data: JSON.stringify(jsonSurveyRecord), 
        overwriteBehavior: do_overwrite,
        forceAutoNumber: 'false'
    };

    post(data, callback);
};

/*
Example Data:
    jsonRecord = [{
        patientcode:"1700.01",
        username:"postman",
        password:"secret",
        user_authentication_complete:"2"
    }]
*/