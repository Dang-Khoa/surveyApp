import axios from 'axios';
import { getAuthHeader } from './authServices';

const API_URL = process.env.REACT_APP_API + "api/user";

function changeEmail(password, email, callback) {
    axios.post(API_URL + '/changeEmail', {
            oldPassword: password,
            newEmail: email
        },
        {
            headers: getAuthHeader()
        }
    )
    .then(
        (response) => {
            return callback(null, 'E-Mail Adresse wurde erfolgreich geändert.');
        },
        (error) => {
            return callback('Passwort ist ungültig.', null);
        }
    );
}

function changeUsername(password, username, callback) {
    axios.post(API_URL + '/changeUsername', {
            oldPassword: password,
            newUsername: username 
        },
        {
            headers: getAuthHeader()
        }
    )
    .then(
        (response) => {
            return callback(null, 'Benutzername wurde erfolgreich geändert.');
        },
        (error) => {
            return callback('Passwort ist ungültig.', null);
        }
    );
}

function changePassword(password, newPassword, callback) {
    axios.post(API_URL + '/changePassword', {
            oldPassword: password,
            newPassword: newPassword 
        },
        {
            headers: getAuthHeader()
        }
    )
    .then(
        (response) => {
            return callback(null, 'Password wurde erfolgreich geändert.');
        },
        (error) => {
            return callback('Passwort ist ungültig.', null);
        }
    );
}

export {
    changeEmail, changeUsername, changePassword
};