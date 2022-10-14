// REST API validation module
// Handle the string format of the data

const { RegistrationData } = require("./model")

// Constants
const ASCII_LOWER = "abcdefghijklmnopqrstuvwxyz"
const ASCII_UPPER = ASCII_LOWER.toUpperCase()
const DIGIT = "0123456789"
const SPECIAL = "!@#$%^&*()_+[]:'\\,./<>?"
const REQUIRED = ASCII_LOWER + ASCII_UPPER + DIGIT + SPECIAL

const EMAIL_REGEX = /[\w\d_]+@\w+\.(?:\w{3}|\w{2}\.\w{2})/
const GENDER_LIST = ["male", "female"]
const MIN_LENGTH = 8

const VALIDATOR_LIST = [
    isValidUsername, 
    isValidPassword, 
    isValidConfirmPassword, 
    isValidFullName, 
    isValidGender
]
const ERROR_LIST = [
    throwInvalidUsername,
    throwInvalidPassword,
    throwInvalidConfirmPassword,
    throwInvalidFullName,
    throwInvalidGender
]



// Low-level functions
function isContains(input, chars) {
    return input.split("").some((char) => chars.includes(char))
}

function isPassMinLength(input) {
    return input.length >= MIN_LENGTH
}

function isNotEmpty(input) {
    return input.replace(/\s+/, "").length > 0
}

function throwInvalidUsername() {
    return "Username must be a valid email format"
}
function throwInvalidPassword() {
    return `Password must be ${MIN_LENGTH} characters and contains 1 (lowercase, uppercase, digit, and special character)`
}
function throwInvalidConfirmPassword() {
    return "Password and Confirm Password must be the same"
}
function throwInvalidFullName() {
    return "Please enter your full name"
}
function throwInvalidGender() {
    return "Please choose your gender (male/female)"
}


// Validation functions
// Each receive object as parameter, then destructure it.
// If the data is invalid, they will return the error message.
function isValidUsername({ username }) {
    return EMAIL_REGEX.exec(username) !== null
}

function isValidPassword({ password }) {
    return isContains(password, REQUIRED) && isPassMinLength(password)
}

function isValidConfirmPassword({ password, confirmPassword }) {
    return password === confirmPassword
}

function isValidFullName({ fullName }) {
    return isNotEmpty(fullName)
}

function isValidGender({ gender }) {
    return GENDER_LIST.some((option) => option === gender)
}


function registerValidation(req, res, next) {
    let regData = new RegistrationData(req.body)
    let valid = regData.checks(VALIDATOR_LIST, ERROR_LIST)
    let response = regData.response(accepted=valid, body="")
    res.send(response)
}

module.exports = { registerValidation: registerValidation }