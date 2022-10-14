// REST API data model
// The purpose of this module is to unify all the response format
// and how they return its data


// Main data model, it can spit out raw data, generate response
// and register errors.
class ResponseState {
    constructor() {
        this.data = null
        this.errors = []
    }
    createResponse(body) {
        return { accepted: !this.hasErrors(), body: body, error: this.errors }
    }
    hasErrors() {
        return this.errors.length > 0
    }
    registerError(...err) {
        this.errors.push(...err)
    }
    sendResponse(res, body) {
        return res.send(this.createResponse(body))
    }
}


function createResponseState() {
    return new ResponseState()
}

function createUserData({username, password, fullName, gender}) {
    return {username: username, password: password, fullName: fullName, gender: gender}
}

function createProfileData({username, fullName, gender}) {
    return {username: username, fullName: fullName, gender: gender}
}


module.exports = {
    createResponseState: createResponseState,
    createUserData: createUserData,
    createProfileData: createProfileData
}