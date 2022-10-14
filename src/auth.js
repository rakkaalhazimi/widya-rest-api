require("dotenv").config()

const collection = require("./mongo")
const jwt = require("jsonwebtoken")
const LIFE_SPAN = "5m"


// Token Authentication
function generateRefreshToken() {
    return process.env.SECRET_KEY
}

function getLoginToken(req, res) {
    if (req.body.username === undefined) {
        return res.sendStatus(403)
    }
    const token = jwt.sign(req.body, generateRefreshToken(), { expiresIn: LIFE_SPAN })
    res.send(token)
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    console.log(res.body)

    if (token === undefined || token === null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

// Database Authentication
function getUser(req, res) {
    if (req.user === undefined) return res.sendStatus(403)

    collection.findOne({}, (err, result) => {
        if (err) return res.sendStatus(500)
        res.send(result)
    })
    // res.send(req.user)
}


module.exports = {
    authenticateToken: authenticateToken,
    getLoginToken: getLoginToken,
    getUser: getUser
}