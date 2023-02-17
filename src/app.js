require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3021;
const { MongoClient, ServerApiVersion } = require('mongodb');
//iSgyltzZwCUpBJti

//subrotachandra

const runMongoDB = async () => {
    const mongodbUsername = process.env.mongodb_username;
    const mongodbPassword = process.env.mongodb_password;
//console.log(mongodbUsername , mongodbPassword);
    const uri = `mongodb+srv://${mongodbUsername}:${mongodbPassword}@cluster0.wc20r02.mongodb.net/?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    //all collection will be here 
    const mathQuizCollection = client.db("test-exam").collection("mathQuiz");
    const physicsQuizCollection = client.db("test-exam").collection("physics-test");
    const chemistryQuizCollection = client.db("test-exam").collection("chemistry-test");

    //get math quiz 
    app.get("/math-quiz" , async(req,res) => {
        const page = parseInt(req.query.page) ; 
        const size = parseInt(req.query.size ); 
        //cursor and query obiliged
        const query = {} ;
        const cursor = await mathQuizCollection.find(query) ;
        const count = await mathQuizCollection.estimatedDocumentCount() ;
        const data  = await cursor.skip(page * size).limit(size).toArray() ;
        res.status(201).send({count , data}) ;
    });

    //get math all data 
     app.get("/math-quiz-all" , async (req ,res) => {
        const query = {} ;
        const cursor = await mathQuizCollection.find(query).toArray() ; 
        res.status(201).send(cursor) 
     });


       //get physics quiz 
    app.get("/physics-quiz" , async(req,res) => {
        const page = parseInt(req.query.page) ; 
        const size = parseInt(req.query.size ); 
        //cursor and query obiliged
        const query = {} ;
        const cursor = await physicsQuizCollection.find(query) ;
        const count = await physicsQuizCollection.estimatedDocumentCount() ;
        const data  = await cursor.skip(page * size).limit(size).toArray() ;
        res.status(201).send({count , data}) ;
    });

    //get physics all data 
     app.get("/physics-quiz-all" , async (req ,res) => {
        const query = {} ;
        const cursor = await physicsQuizCollection.find(query).toArray() ; 
        res.status(201).send(cursor) 
     });

      //get chemistry quiz 
      app.get("/chemistry-quiz" , async(req,res) => {
        const page = parseInt(req.query.page) ; 
        const size = parseInt(req.query.size ); 
        //cursor and query obiliged
        const query = {} ;
        const cursor = await chemistryQuizCollection.find(query) ;
        const count = await chemistryQuizCollection.estimatedDocumentCount() ;
        const data  = await cursor.skip(page * size).limit(size).toArray() ;
        res.status(201).send({count , data}) ;
    });

    //get chemistry all data 
     app.get("/chemistry-quiz-all" , async (req ,res) => {
        const query = {} ;
        const cursor = await chemistryQuizCollection.find(query).toArray() ; 
        res.status(201).send(cursor) 
     });
}


runMongoDB().catch(error => console.info("You have an error please fixed this =>", error));

app.listen(port, async (req, res) => {
    console.log(`Your server runnig on port number: ${port}`);
})
 

app.get("/", async (req, res) => {
    res.send("Welcome this home page.");
})
