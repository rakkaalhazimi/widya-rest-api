const { getLoginToken, authenticateToken, getUser } = require("../auth")
const { registerValidation } = require("../validation")
const express = require("express")
const route = express.Router()


// Setup response message object
route.use((req, res, next) => {
    res.message = {}
    next()
})

// Login
route.get("/login", getLoginToken)

route.post("/login", authenticateToken, getUser)

route.get("/logintest", (req, res) => {
    console.log("debug")
    console.log(res.message)
    res.send(res.message)
})




// Register
route.get("/register", registerValidation)

route.post("/register", (req, res) => {
    res.send("register")
})

// Profile
route.get("/profile", authenticateToken, getUser)




route.post("/test", (req, res) => {
    req.test = "aaa"
    res.send(req.test)
})

module.exports = route