const post = require('./post');
const validKeyList = ['records', 'fields', 'forms', 'events'];

module.exports = function(searchCriterias, callback) {
    var data = {
        content: 'record',
        type: 'flat',
    };

    var validCriterias = getValidCriterias(searchCriterias);
    var jsonData = Object.assign({}, data, validCriterias);

    post(jsonData, callback);
};

getValidCriterias = (searchCriterias) => {
    var validCriterias = {}
    for (var key in searchCriterias) {
        if (validKeyList.indexOf(key) > -1)
            validCriterias[key] = searchCriterias[key];
    }

    return validCriterias;
}