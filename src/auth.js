require("dotenv").config()

const jwt = require("jsonwebtoken")
const LIFE_SPAN = "5m"


// Token Authentication
function generateRefreshToken() {
    return process.env.SECRET_KEY
}

function getLoginToken(req, res) {
    const token = jwt.sign({ username: req.body.username }, generateRefreshToken(), { expiresIn: LIFE_SPAN })
    res.send(token)
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    console.log(res.body)

    if (token === undefined || token === null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, generateRefreshToken(), (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports = {
    authenticateToken: authenticateToken,
    getLoginToken: getLoginToken,
}