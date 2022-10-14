require("dotenv").config()

const bcrypt = require("bcrypt")
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

// Password Authentication
function hashPassword(req, res, next) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.sendStatus(500)
        req.body.password = hash
    })
    next()
}

function authenticatePassword(req, res, next) {
    bcrypt.compare(req.body.password, req.body.storedPassword, (err, result) => {
        if (err) return res.sendStatus(500)
        if (result) return next()
        else {
            res.state.registerError("Incorrect Password or Username")
            let response = res.state.createResponse(body="")
            res.send(response)
        }
    })
}


module.exports = {
    authenticatePassword: authenticatePassword,
    authenticateToken: authenticateToken,
    getLoginToken: getLoginToken,
}