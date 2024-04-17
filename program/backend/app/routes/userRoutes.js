const { attachTokenToUser, requireAdmin, requireAuth } = require("../middlewares");
const UserController = require("../controllers/userController");
const userController = new UserController();

module.exports = function(app, notificationController) {
    app.get("/api/user/content", attachTokenToUser, userController.getUserContent);
    app.post("/api/user/survey/save", attachTokenToUser, userController.saveSurvey);
    app.post("/api/user/survey/get", attachTokenToUser, userController.getSurvey);
    app.post("/api/user/notification/subscribe", attachTokenToUser, notificationController.subscribe);
    app.post("/api/user/notification/settings", attachTokenToUser, notificationController.subscribe);

    app.post("/api/user/changeEmail", attachTokenToUser, userController.changeEmail, userController.changeCredentials);
    app.post("/api/user/changeUsername", attachTokenToUser, userController.changeUsername, userController.changeCredentials);
    app.post("/api/user/changePassword", attachTokenToUser, userController.changePassword, userController.changeCredentials);
};