const webPush = require('web-push');
const fs = require('fs');
const controllerInterface = require('./controllerInterface');

const vapidKeys = {
    'publicKey': process.env.VAPID_PUB_KEY,
    'privateKey': process.env.VAPID_PRIV_KEY
}
const notificationInterval = [2, 6, 12, 18, 24, 30, 36, 42, 48]

module.exports = class userController extends controllerInterface {
    constructor() {
        super();
        // this.sortedNotifications = []; // list of objects with dueDate, subscription, user
        this.sortedNotifications = [];

        webPush.setVapidDetails('mailto:sender@example.com', vapidKeys.publicKey, vapidKeys.privateKey);
    }

    subscribe = (req, res) => {
        if(!req.body || !req.body.subscription || !JSON.parse(req.body.subscription).endpoint)
            return res.status(400).json({ error: 'Subscription muss Endpunkt haben.' });

        var newUserData = {
            subscription: req.body.subscription,
            do_send: '1'
        }

        var that = this;
        this.storageAccess.findUser('patientcode', req.user.patientcode, async function(err, user) {
            if (user) {
                console.log(user);
                that.storageAccess.setNewUserData(user, newUserData, function(err, data) {
                    if (err) 
                        return res.status(400).json({ error: err })
                    else if (data){
                        var today = new Date();
                        that.scheduleNextNotification(user, today);
                        return res.status(200).json({ message: 'Subscription erfolgreich gespeichert.' });
                    }
                    else 
                        return res.status(403).json({ error: 'Interner Fehler.' });
                })
            }
            else
                return res.status(403).json({ error: 'Interner Fehler.' });
        });
    }

    setNotificationSettings = (req, res) => {
        if(!req.body || !req.body.doSendNotifications)
            return res.status(400).json({ error: 'Ungültgie Notifikationseinstellungen.' })

        var newUserData = {
            do_send: req.body.doSendNotifications
        }

        var that = this;
        this.storageAccess.findUser('patientcode', user.patientcode, async function(err, user) {
            if (user) {
                that.storageAccess.setNewUserData(user, newUserData, function(err, data) {
                    if (err) 
                        return res.status(400).json({ error: err })
                    else if (data) 
                        return res.status(200).json({ message: 'Notifikationseinstellungen erfolgreich geändert.' });
                    else 
                        return res.status(403).json({ error: 'Interner Fehler.' });
                })
            }
            else
                return res.status(403).json({ error: 'Interner Fehler.' });
        });
    }

    triggerPushNotification = (subscription) => {
        return webPush.sendNotification(subscription, 'Umfrage fällig')
            .then(function() {
                console.log('Notification pushed')
            })
            .catch((err) => {
                console.log('Notification push failed.');
                if(err.statusCode === 404 || err.statusCode === 410) 
                    console.log('Subscription has expired or is invalid: ', err);
                else
                    throw err;
        });
    }

    scheduleNextNotification = (user, lastDueDate) => {
        var surveyDueDate = new Date(user.childs_birth_day);
        var today = new Date();

        for(var i = 0; i < notificationInterval.length; i++) {
            surveyDueDate.setMonth(surveyDueDate.getMonth()+ notificationInterval[i]) 
            if (today > surveyDueDate && surveyDueDate > lastDueDate) {
                var notification = {
                    user: user,
                    dueDate: surveyDueDate
                }
                this.addNotificationToSortedList(notification);
                fs.writeFileSync('./sortedNotifications.txt', JSON.stringify(this.sortedNotifications), {flag: 'w'}, err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    //file written successfully
                })
                return;
            }
        }
        return -1;
    }

    addNotificationToSortedList = (notification) => {
        var dueDate = notification['dueDate'];
        var index = 0;
        var high = this.sortedNotifications.length;

        while (index < high) {
            var mid = (index + high) >>> 1; //same as division over 2
            if (this.sortedNotifications[mid]['dueDate'] < dueDate) index = mid + 1;
            else high = mid;
        }

        this.sortedNotifications.splice(index, 0, notification);
        return;
    }

    checkForNotificationsToBePushed = () => {
        console.log('checking for pending notifications...')
        if(this.sortedNotifications.length > 0 && this.notificationDue(this.sortedNotifications[0]['dueDate'])){
            this.storageAccess.findUser('patientcode', this.sortedNotifications[0]['user'].patientcode, function(err, user) {
                console.log(user)
                if(user.do_send === '1') {
                    console.log("pushing...");
                    this.triggerPushNotification(this.sortedNotifications[0]['user'])
                    this.scheduleNextNotification(this.sortedNotifications[0]['user'])
                    this.sortedNotifications.shift();

                    checkForNotificationsToBePushed();
                }
                return;
            }
            )
        }
        else {
            console.log('no notifications found');
            return;
        }
    }

    notificationDue = (givenDate) => {
        const today = new Date();
        return givenDate < today;
    }

}