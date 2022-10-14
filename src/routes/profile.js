const { authenticateToken } = require("../auth")
const { createProfileData } = require("../model")
const db = require("../mongo")
const express = require("express")
const route = express.Router()

// GET REQUEST
route.get("/profile",
    // Authenticate login token
    authenticateToken,

    // Return user profile
    async (req, res) => {
        await db.collection.findOne({ username: req.user.username }, (err, result) => {
            if (err) res.sendStatus(500)
            let profile = createProfileData(result)
            res.send(profile)
        })
    }
)

module.exports = route