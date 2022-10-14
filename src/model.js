class DataModel {
    get() {
        return this.data
    }
}

class Validation extends DataModel {
    constructor() {
        super()
    }
    check(input, error, func) {
        return func(input) || error
    }
}


class ResponseData extends DataModel {
    constructor(accepted, body, error) {
        super()
        this.data = {
            accepted: accepted,
            body: body,
            error: error
        }
    }
}

class ProfileData extends DataModel {
    constructor(username, fullName, gender) {
        super()
        this.data = {
            username: username,
            fullName: fullName,
            gender: gender
        }
    }
}


class RegistrationData extends Validation {
    constructor(username, password, confirmPassword, fullName, gender) {
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


module.exports = {
    RestResponse: ResponseData,
    ProfileData: ProfileData,
    RegistrationData: RegistrationData
}