const { MongoClient, ServerApiVersion } = require("mongodb-legacy")
const { createUserData, createProfileData } = require("./model")

const uri = "mongodb+srv://alhazimi:alhazimi@cluster0.0mxgk.mongodb.net/?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

// Setup mongo db collections
const dbName = "Olshop"
const collectionName = "Shopee"
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
    // res.send(req.user)
}

// async function deleteData() {
//     await collection.find({username: "rakkaalhazimi@gmail.com"}).toArray().then((result) => {
//         console.log(result)
//     })
//     await collection.deleteMany({username: "rakkaalhazimi@gmail.com"})
//     process.exit()
// }
// deleteData()


function throwExistsUsername() {
    return "Username already exists"
}

function throwIncorrectLogin() {
    return "Incorrect username or password"
}


// collection.findOne({name: 'aazz'}, (err, result) => {
//     if (err) console.error(err)
//     console.log(result)
//     process.exit()
// })

// async function run() {
//     let result = await collection.findOne()
//     console.log(result)
//     process.exit()
// }

// async function isNotExistsUsername(username) {
//     let result = await collection.findOne({username: username}) === null
//     console.log(result)
//     process.exit()
// }
// isNotExistsUsername("test")

module.exports = {
    collection: collection,
    insertNewUser: insertNewUser,
    isUserExists: isUserExists,
    getUserProfile: getUserProfile,
    throwExistsUsername: throwExistsUsername,
    throwIncorrectLogin: throwIncorrectLogin
}