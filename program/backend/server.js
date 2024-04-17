require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');

const app = express();

// to enable parsing json and urlenencoded data
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    console.log('request: ');
    console.log('x-access-token', req.headers['x-access-token']);
    console.log('\n');
    next()
})

require("./app/routes/authRoutes")(app);
require("./app/routes/adminRoutes")(app);
// requires auth-Token
const NotificationController = require("./app/controllers/notificationController");
const notificationController = new NotificationController();
require("./app/routes/userRoutes")(app, notificationController);

//check for notifications every day at 12:00
cron.schedule("0 12 * * *", function() {
    notificationController.checkForNotificationsToBePushed()
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log('API listening on localhost:' , port);
});