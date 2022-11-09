const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors())
app.use(express())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fuly7hk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const servicesCollection = client.db('serviceReview').collection('services')
        app.get('/services',async(req,res)=>{
            const query = {};
            const cursor = servicesCollection.find(query)
            const services = await cursor.toArray();
            res.send(services)
        })
    }
    finally{

    }
}
run().catch(err=>console.log(err))


app.get('/', (req, res) => {
    res.send('api is running')
})
app.listen(port, () => {
    console.log(port)
})