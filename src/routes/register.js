const bcrypt = require("bcrypt")
const { createUserData } = require("../model")
const db = require("../mongo")
const valid = require("../validation")
const express = require("express")
const route = express.Router()

// GET REQUEST
route.get("/register", (req, res) => { res.send("use post request to register") })


// POST REQUEST
route.post("/register",

    // Register Validation
    async (req, res, next) => {
        if (!valid.isValidUsername(req.body)) {
            res.state.registerError(valid.throwInvalidUsername())
        }
        if (!valid.isValidPassword(req.body)) {
            res.state.registerError(valid.throwInvalidPassword())
        }
        if (!valid.isValidConfirmPassword(req.body)) {
            res.state.registerError(valid.throwInvalidConfirmPassword())
        }
        if (!valid.isValidFullName(req.body)) {
            res.state.registerError(valid.throwInvalidFullName())
        }
        if (!valid.isValidGender(req.body)) {
            res.state.registerError(valid.throwInvalidGender())
        }
        if (res.state.hasErrors()) {
            return res.state.sendResponse(res, body = "Invalid user input")
        }
        next()
    },

    // Check username in database
    async (req, res, next) => {
        await db.collection.findOne({ username: req.body.username }, (err, result) => {
            if (err) res.sendStatus(500)
            if (result !== null) {
                res.state.registerError(db.throwExistsUsername())
                return res.state.sendResponse(res, body = "Please use another username")
            }
            next()
        })
    },

    // Hash user's password
    async (req, res, next) => {
        await bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) return res.sendStatus(500)
            req.body.password = hash
            next()
        })
    },

    // Insert user data in database
    async (req, res, next) => {
        let user = createUserData(req.body)
        await db.collection.insertOne(user)
        return res.state.sendResponse(res, body = "Registration success")
    }
)




module.exports = route