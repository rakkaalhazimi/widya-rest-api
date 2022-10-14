const { getLoginToken } = require("../auth")
const bcrypt = require("bcrypt")
const db = require("../mongo")
const express = require("express")
const route = express.Router()


// GET REQUEST
route.get("/login", (req, res) => { res.send("login") })

// POST REQUEST
route.post("/login",

    // Check if username exists
    async (req, res, next) => {
        await db.collection.findOne({ username: req.body.username }, (err, result) => {
            if (err) res.sendStatus(500)
            if (result === null) {
                res.state.registerError(db.throwIncorrectLogin())
                return res.state.sendResponse(res, body = "Please check your username and password")
            }
            // Keep stored password's hash
            req.body.hash = result.password
            next()
        })
    },

    // Compare password hash with user's password
    async (req, res, next) => {
        await bcrypt.compare(req.body.password, req.body.hash, (err, result) => {
            if (err) return res.sendStatus(500)
            if (!result) {
                res.state.registerError(db.throwIncorrectLogin())
                return res.state.sendResponse(res, body = "Please check your username and password")
            }
            next()
        })
    },

    // Return login token to user
    getLoginToken

)

module.exports = route