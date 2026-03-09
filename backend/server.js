const express = require('express')
const cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb')

require('dotenv').config({ path: __dirname + '/.env' })

const app = express()
const port = 3000
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url);
app.use(express.json());
app.use(express.text());
app.use(cors());

const dbName = 'passwordmanager';

client.connect();


app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findresult = await collection.find({}).toArray();
    res.json(findresult);
})

app.post('/', async (req, res) => {
    console.log(req.headers)
    console.log(req.body)
    let password = req.body
    if (typeof password=="string"){
        try {
            password = JSON.parse(password)
        } catch (e) {
            return res.status(400).send({error: "Invalid JSON Body"})
        }
    }
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findresult = await collection.insertOne(password);
    res.send({success: true, result: findresult});
})

app.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findresult = await collection.deleteOne({_id: new ObjectId(id)});
    res.send({success: true, result: findresult});
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})