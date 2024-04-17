const AuthController = require('../controllers/authController');
const authController = new AuthController();

module.exports = function(app) {
    app.post("/api/auth/signin", authController.signin);
    app.post('/api/auth/signup', authController.signup); 

    app.post("/api/auth/reset", authController.resetPassword);
    app.post("/api/auth/setPassword", authController.setNewPassword);
    app.post("/api/auth/checkToken", authController.checkToken);
    app.post("/api/auth/userId", authController.checkUserId);
};