const jwtDecode = require('jwt-decode');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) 
        return res.status(401).json({ message: 'Authentifikation invalide.' });
    const decodedToken = jwtDecode(token.slice(7));

    if (!decodedToken) {
        return res.status(401).json({message: 'Es gab ein Problem mit der Authentifizierung.'});
    } 
    else {
        req.user = decodedToken;
        next();
    }
};
