import axios from 'axios';
import { getAuthHeader } from './authServices';

const API_URL = process.env.REACT_APP_API + "api/user/notification";

function sendSubscriptionToBackend(subscription, callback) {
    axios.post(API_URL + '/subscribe', {
            subscription: JSON.stringify(subscription)
        }, 
        {
            headers: getAuthHeader()
        }
    )
    .then(
        (response) => {
            return callback(null, response.data.message);
        },
        (error) => {
            return callback(error);
        }
    )
}

function setSubscriptionSettings(doSendNotifications, callback) {
    axios.post(API_URL + '/settings', {
            doSendNotifications: doSendNotifications 
        }, 
        {
            headers: getAuthHeader()
        }
    )
    .then(
        (response) => {
            return callback(null, response.data.message);
        },
        (error) => {
            return callback(error);
        }
    )
}

function triggerNotification(callback) {
    axios.post(API_URL + '/trigger', {}, {
            headers: getAuthHeader()
        }
    )
    .then(
        (response) => {
            return callback(null, response.data.message);
        },
        (error) => {
            return callback(error);
        }
    )
}

export {
    sendSubscriptionToBackend, triggerNotification, setSubscriptionSettings
}