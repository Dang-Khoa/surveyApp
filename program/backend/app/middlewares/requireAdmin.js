module.exports = (req, res, next) => {
    const { role } = req.user;
    if (role != 'admin') 
        return res.status(401).json({ message: 'Fehlende Rechte.' });
    next();
}