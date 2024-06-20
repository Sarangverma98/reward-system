module.exports = (req, res, next) => {
    const adminUsernames = ['admin1', 'admin2'];

    if (req.body.user && adminUsernames.includes(req.body.user.username)) {
        next();
    } else {
        res.status(403).json({ error: 'Access denied' });
    }
};
