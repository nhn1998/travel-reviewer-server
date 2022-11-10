const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fuly7hk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const servicesCollection = client.db('serviceReview').collection('services');
        const reviewCollection = client.db('serviceReview').collection('review')
        app.post('/users',async(req,res)=>{
            const user = req.body;
            console.log(user)
            const result = await reviewCollection.insertOne(user)
            res.send(result)
        });
        app.delete('/users/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const result = await reviewCollection.deleteOne(query)
            res.send(result)
        })
        app.get('/users/myReviews',async(req,res)=>{
            let query = {};
            if(req.query.email){
                query = {
                    email:req.query.email
                }
            }
            const cursor = reviewCollection.find(query)
            const users = await cursor.toArray()
            res.send(users)
        })
        app.get('/users',async(req,res)=>{
            console.log(req.query)
            let query={};
            if(req.query.servicesId){
                query={
                    servicesId:req.query.servicesId
                }
            }
            const cursor= reviewCollection.find(query)
            const users = await cursor.toArray();
            res.send(users)
        })
        app.get('/services',async(req,res)=>{
            const query = {};
            const cursor = servicesCollection.find(query)
            const services = await cursor.toArray();
            res.send(services)
        })
        app.get('/services/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const cursor = await servicesCollection.findOne(query)
            res.send(cursor)
        })
        app.get('/service',async(req,res)=>{
            const query = {};
            const cursor = servicesCollection.find(query)
            const services = await cursor.limit(3).toArray();
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