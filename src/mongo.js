const { MongoClient, ServerApiVersion } = require("mongodb-legacy")
const { createUserData, createProfileData } = require("./model")

const uri = "mongodb+srv://alhazimi:alhazimi@cluster0.0mxgk.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

// Setup mongo db collections
const dbName = "Widya"
const collectionName = "test"
const db = client.db(dbName)
const collection = db.collection(collectionName)


function isUserExists(req, res, next) {
    collection.findOne({username: req.body.username}, (err, result) => {
        if (err) return res.sendStatus(500)
        if (result !== null) {
            console.log(result)
            res.state.registerError("Username already exists")
            let response = res.state.createResponse(body="")
            return res.send(response)
        }
        next()
    })
}

function insertNewUser(req, res) {
    let user = createUserData(req.body)
    collection.insertOne(user)
    let response = res.state.createResponse(body="Registration Success")
    res.send(response)
}

function getUserProfile(req, res) {
    if (req.user === undefined) return res.sendStatus(403)

    collection.findOne({}, (err, result) => {
        if (err) return res.sendStatus(500)
        let profile = createProfileData(result)
        let response = res.state.createResponse(body=profile)
        res.send(response)
    })
}

async function deleteUser(req, res, next) {
    await collection.deleteOne({username: req.body.username})
    process.exit()
}


function throwExistsUsername() {
    return "Username already exists"
}

function throwIncorrectLogin() {
    return "Incorrect username or password"
}


module.exports = {
    collection: collection,
    insertNewUser: insertNewUser,
    isUserExists: isUserExists,
    getUserProfile: getUserProfile,
    throwExistsUsername: throwExistsUsername,
    throwIncorrectLogin: throwIncorrectLogin
}