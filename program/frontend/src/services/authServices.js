import axios from 'axios';

const API_URL = process.env.REACT_APP_API + "api/auth";

function getAuthHeader() {
    const token = localStorage.getItem('token');

    if (token) 
        return { 'x-access-token': token };
    return null;
}

function checkToken(token, callback) {
    axios.post(API_URL + '/token', {
        token: token
    })
    .then(
        (response) => {
            var { userId } = response.data;
            return callback(null, userId);
        },
        (error) => {
            return callback(error.response.data['error'], null);
        }
    )
}

function checkUserId(userId, callback) {
    axios.post(API_URL + '/userId', {
        userId: userId
    })
    .then(
        (response) => {
            return callback(null, response.data.message);
        },
        (error) => {
            return callback(error.response.data['error'], null);
        }
    )
}

function requestToken (email, callback) {
    axios.post(API_URL + '/reset', {
            email: email, 
        })
        .then(
                (response) => {
                return callback(null, response.data.message);
            },
            (error) => {
                return callback(error.response.data['error'], null);
            }
        );
}

function setNewPassword(token, password, callback) {
    console.log('setting up')
    axios.post(API_URL + '/setPassword', {
        token: token,
        password: password
    })
    .then(
            (response) => {
                return callback(null, response.data.message);
            },
            (error) => {
                console.log(error.response)
                return callback(error.response.data['error'], null);
            }
    )
}

function signup(userId, email, username, password, callback) {
    axios.post(API_URL + "/signup", { 
            userId: userId,
            email: email, 
            username: username, 
            password: password
        })
        .then(
            (response) => {
                var { token, userInfo, expiresAt } = response.data;
                var userData = {
                    token: token,
                    userInfo: userInfo,
                    expiresAt: expiresAt
                }
                return callback(null, userData);
            },
            (error) => {
                return callback(error.response.data['error'], null);
            }
        );
};

function signin(username, password, callback) {
    axios.post(API_URL + "/signin", { 
            username: username, 
            password: password
        })
        .then(
            (response) => {
                var { token, userInfo, expiresAt } = response.data;
                var userData = {
                    token: token,
                    userInfo: userInfo,
                    expiresAt: expiresAt
                }
                return callback(null, userData);
            },
            (error) => {
                return callback(error.response.data['error'], null);
            }
        );
};


export { 
    signup, signin, checkToken, getAuthHeader, 
    checkUserId, requestToken, setNewPassword
}; 
