const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const token = req.header('token')

    if (!token) {
        return res.status(401).json({ status: "failure", msg: "No token, authorization denied" })
    }

    try {
        const decoded = jwt.verify(token, "africanImpactProject");

        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ status: "failure", msg: "Bad token" })
    }
}

module.exports = auth;