require("dotenv").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

exports.createToken = (user) => {
    if (!user.role)
        throw new Error('No user role specified.');

    return jwt.sign(
        {
            sub: user.id,
            patientcode: user.patientcode,
            role: user.role,
            iss: process.env.API_PATH,
            aud: process.env.API_PATH
        },
        process.env.JWT_SECRET,
        { algorithm: 'HS256', expiresIn: '1h' }
    );
}

exports.hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        // Generate a salt at level 12 strength
        bcrypt.genSalt(12, (err, salt) => {
            if (err) 
                reject(err);
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) 
                    reject(err);
                resolve(hash);
            });
        });
    });
}

exports.verifyPassword = (givenPassword, passwordHash) => {
    return bcrypt.compare(givenPassword, passwordHash);
}

exports.generateRandomId = () => {
    return uuidv4();
}