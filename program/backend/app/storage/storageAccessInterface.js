module.exports = class storageAccess {
    constructor() {}

    createUser(callback) {}
    setUser(userData, callback) {}
    findUser(key, value, callback) {}
    setResetToken(resetToken, email, callback) {}
    setNewUserData(resetToken, newUserData, callback) {}
    checkToken(resetToken) {}
    checkUserParam(paramKey, paramValue, user, callback) {}
    setSubscriptionSettings(user, settings, callback) {}

    saveSurvey(user, surveyEvent, surveyJson, callback) {}
    getSurvey(user, surveyForm, surveyEvent, callback) {}
}