import { sendSubscriptionToBackend } from './services/notificationServices';

const swFile= process.env.PUBLIC_URL + '/sw.js';

function register() {
    if(!('serviceWorker' in navigator))
       return; 

    return navigator.serviceWorker.register(swFile)
        .then(function(registration) {
            console.log('Service worker registered.');
            return registration;
        })
        .catch(function(err){
            console.error('Unable to register worker.');
        })
}

function askPermission() {
    if(!('serviceWorker' in navigator))
        return false;
    if(!('PushManager' in window))
        return false;

    return new Promise(function(resolve, reject) {
        const permissionResult = Notification.requestPermission(function(result) {
            resolve(result);
        })

        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    })
    .then(function(permissionResult) {
        if(permissionResult !== 'granted') {
            console.log('No permission was granted.');
        }
    });
}

async function subscribeUser() {
    const vapidPublicKey = 'BDk7K9x7vLwnD7Uc6-b06UwKs1lTeC7xE8h0F-YHyL2BZk8xPsKaJIBv9H5AJ3pMPkpB9CyZdrjujqSeBooqEpw';
    return navigator.serviceWorker.getRegistration()
        .then(function(registration) {
            const subscribeOptions = {
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
            };
            console.log(registration)

            return registration.pushManager.subscribe(subscribeOptions);
        })
        .then(function(subscription) {
            console.log('Received push subscription: ', JSON.stringify(subscription));
            sendSubscriptionToBackend(subscription, function(err, message) {
                if(message)
                    console.log(message);
                else   
                    console.error(err);
            })
            return subscription;
        });
}

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export {
    register, askPermission, subscribeUser
}