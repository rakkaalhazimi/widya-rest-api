const express = require("express")
const route = express.Router()


route.get('/', (req, res) => {
    res.render("base", {filename: "home.ejs"})
})

module.exports = route