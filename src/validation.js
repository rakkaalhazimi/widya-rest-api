// Constants
const ASCII_LOWER = "abcdefghijklmnopqrstuvwxyz"
const ASCII_UPPER = ASCII_LOWER.toUpperCase()
const DIGIT = "0123456789"
const SPECIAL = "!@#$%^&*()_+[]:'\\,./<>?"
const REQUIRED = ASCII_LOWER + ASCII_UPPER + DIGIT + SPECIAL

const EMAIL_REGEX = /[\w\d_]+@\w+\.(?:\w{3}|\w{2}\.\w{2})/
const MIN_LENGTH = 8

const GENDER_LIST = ["male", "female"]

const VALIDATION_CHECKERS = [
    isValidUsername, 
    isValidPassword, 
    isValidConfirmPassword,
    isValidFullName,
    isValidGender
]

// Register's data template
const registerData = {
    username: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    gender: "",
}


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


// Validation functions
function isValidUsername({ username }) {
    let passed = EMAIL_REGEX.exec(username) !== null
    return {
        field: "username",
        passed: passed,
        message: passed ? "OK" : "Username must be a valid email format"
    }
}

function isValidPassword({ password }) {
    let passed = isContains(password, REQUIRED) && isPassMinLength(password)
    return {
        field: "password",
        passed: passed,
        message: passed ? "OK" : `Password must be ${MIN_LENGTH} characters and contains 1 (lowercase, uppercase, digit, and special character)`
    }
}

function isValidConfirmPassword({ password, confirmPassword }) {
    let passed = password === confirmPassword
    return {
        field: "confirmPassword",
        passed: passed,
        message: passed ? "OK" : "Password and Confirm Password must be the same"
    }
}

function isValidFullName({ fullName }) {
    let passed = isNotEmpty(fullName)
    return {
        field: "fullName",
        passed: passed,
        message: passed ? "OK" : "Please enter your full name"
    }
}

function isValidGender({ gender }) {
    let passed = GENDER_LIST.some((option) => option === gender)
    return {
        field: "gender",
        passed: passed,
        message: passed ? "OK" : "Please choose your gender (male/female)"
    }
}


function registerValidation(req, res, next) {
    // Default request body (handle undefined)
    req.body = {...registerData, ...req.body}

    // Create status messages
    const status = {
        accepted: false,
        info: VALIDATION_CHECKERS
    }

    // Check each register data
    status.info = status.info.map((isValid) => isValid(req.body))
    
    // Determine register data validity
    status.accepted = status.info.every((data) => data.passed === true)

    if (status.accepted) return res.send(status)
    res.send(status)
}

module.exports = { registerValidation: registerValidation }