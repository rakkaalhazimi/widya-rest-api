const express = require("express")
const path = require("path")


// Setup
const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }))  // Access form data from user
app.use(express.json())                          // Parse json data from response


// Settings
app.set("view engine", "ejs")                           // View engine use .ejs extensions
app.set('views', path.join(__dirname, "/src/views"))    // Set default views directory


// Routes
const homeRoute = require("./src/routes/home")
const userRoute = require("./src/routes/user")
app.use(homeRoute)
app.use(userRoute)


// Listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})