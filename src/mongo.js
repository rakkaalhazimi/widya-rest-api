const { MongoClient, ServerApiVersion } = require("mongodb-legacy");

const uri = "mongodb+srv://alhazimi:alhazimi@cluster0.0mxgk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })

// Setup mongo db collections
const dbName = "Olshop"
const collectionName = "Shopee"
const db = client.db(dbName)
const collection = db.collection(collectionName)


function isUserExists(req, res, next) {
    collection.findOne({username: req.body.username}, (err, result) => {
        if (err) return res.sendStatus(403)
    })
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

module.exports = collection