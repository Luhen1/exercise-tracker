const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) return res.status(401).json({errorMessage: "Acesso negado"});

        const verified = jwt.verify(token, process.env.JWT_SECRET);

    } catch (err) {
        console.error(err);
        res.status(401).json({ errorMessage: "Acesso negado"});
    }
}

module.exports = auth;