const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json())
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//db_user: node-reactPractice 
//db_pass: tIWSjGmg3L3od4Mh

const uri = "mongodb+srv://node-reactPractice:tIWSjGmg3L3od4Mh@cluster0.d0czc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();

        const userCollection = client.db("reactNonde").collection("userCollection")
        // const userCollection = client.db("reactNonde").collection("userCollection");
        const user = { name: "Bangladesh", email: "bangladesh@gmail.com" }
        app.post('/user', async (req, res) => {

            const newUser = req.body;
            const result = await userCollection.insertOne(newUser)
            res.send(result)
        })


        app.get("/user", async (req, res) => {

            const query = {}
            const getDoc = userCollection.find(query)
            const user = await getDoc.toArray()
            res.send(user)

        })


        //user get 
        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.findOne(query)
            res.send(result)
        })

        //user delete
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await userCollection.deleteOne(query)
            res.send(result)
        })
        //user Delte
        app.put('/user/:id', async (req, res) => {

            const id = req.params.id;
            const userInfo = req.body;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }
            const updatedUser = {
                $set: {
                    name: userInfo.name,
                    email: userInfo.email
                }
            };
            const result = await userCollection.updateOne(filter, updatedUser, options  )

            res.send(result)

        })



    }
    finally {
        // await client.close()
    }
}

run().catch(console.dir)


// const uri = "mongodb+srv://node-reactPractice:tIWSjGmg3L3od4Mh@cluster0.d0czc.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// async function run() {

//     try {
//         await client.connect()
//         const userCollection = client.db("reactNonde").collection("userCollection");
//         const user = {
//             country: "Pakistan",
//             email: "pakistan@gmail.com"
//         }

//         const result = await userCollection.insertOne(user)
//     }
//     finally {
//         // await client.close()
//     }

// }


// client.connect(err => {
//     const collection = client.db("reactNonde").collection("userCollection");
//     // perform actions on the collection object
//     console.log("connected")
//     client.close();
// });

// run().catch(console.dir)


app.get('/', (req, res) => {
    res.send("Hello programmerz")
})

app.listen(port, () => {
    console.log("It's working ")
})