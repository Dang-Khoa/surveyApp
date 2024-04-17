const post = require('./post');

module.exports = function(callback) {
    jsonData = { content: 'version' }
    post(jsonData, callback);
};

// was used to test the redcap api response