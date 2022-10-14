// REST API data model
// The purpose of this module is to unify all the response format
// and how they return its data


// Main data model, it can spit out raw data, generate response
// and register errors.
class DataModel {
    constructor() {
        this.data = null
        this.errors = []
    }
    registerError(err) {
        this.errors.push(err)
    }
    response(accepted, body) {
        return { accepted: accepted, body: body, error: this.errors }
    }
}

// Validation system which can check all the data validity
// through one method. It also register error message when the
// validation is not fulfilled
class ValidationModel extends DataModel {
    constructor() { super() }

    checks(functions) {
        return functions.every((func) => func(this.data))
    }
}

// Below classes inherit method from data model
// It gives them the ability to spit data out and generate response
class ProfileData extends DataModel {
    constructor({ username, fullName, gender }) {
        super()
        this.data = { username: username, fullName: fullName, gender: gender }
    }
}

class RegistrationData extends ValidationModel {
    constructor({ username, password, confirmPassword, fullName, gender }) {
        super()
        this.data = {
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            fullName: fullName,
            gender: gender
        }
    }
}

class LoginData extends ValidationModel {
    constructor(username, password) {

    }
}


module.exports = {
    ProfileData: ProfileData,
    RegistrationData: RegistrationData
}