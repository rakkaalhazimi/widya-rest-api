const express = require("express")
const path = require("path")
const { createResponseState } = require("./src/model")


// Setup
const app = express()
const port = 3000
app.use(express.urlencoded({ extended: true }))         // Access form data from user
app.use(express.json())                                 // Parse json data from response
app.use((req, res, next) => {                         // Register response state 
  res.state = createResponseState()
  next()
})   



// Settings
app.set("view engine", "ejs")                           // View engine use .ejs extensions
app.set('views', path.join(__dirname, "/src/views"))    // Set default views directory


// Routes
const homeRoute = require("./src/routes/home")
const registerRoute = require("./src/routes/register")
app.use(homeRoute)
app.use(registerRoute)


// Listen
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})