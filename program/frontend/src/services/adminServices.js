import axios from 'axios';
import { getAuthHeader } from './authServices';

const API_URL = process.env.REACT_APP_API + "api/admin";

function createUser(email, patientcode, childsBirthDay, callback) {
    axios.post(API_URL + '/createUser', {
            email: email, 
            patientcode: patientcode,
            childsBirthDay: childsBirthDay,
            appUrl: process.env.REACT_APP_URL + 'signup/'
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
            return callback(error.response.data['error'], null);
        }
    )
}

function createAdmin(email, patientcode, callback) {
    axios.post(API_URL + '/createAdmin', {
            email: email, 
            patientcode: patientcode,
            appUrl: process.env.REACT_APP_URL + 'signup/'
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
            console.log(error.response);
            return callback(error.response.data['error'], null);
        }
    )
}

export { createUser, createAdmin };