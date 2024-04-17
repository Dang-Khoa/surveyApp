const AdminController = require("../controllers/adminController");
const adminController = new AdminController();

module.exports = function(app) {
    app.post("/api/admin/createUser", adminController.createUser);
    app.post("/api/admin/createAdmin", adminController.createAdmin);
};