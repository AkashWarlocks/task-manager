var MongoClient = require('mongodb').MongoClient;

const databaseUrl = 'mongodb://localhost:27017/'
const databaseName = 'task-manager'

MongoClient.connect(databaseUrl,{ useNewUrlParser: true}, (error, client) => {
    if(error) {
        console.log("Unable to connect")
    }
    console.log("Conn Succesfull")

    const dbo = client.db(databaseName)

    dbo.collection('users').insertMany([{
        description:"Java",
        completed:false
    },
    {
        description:"Blockchain",
        completed:false
    },
    {
        description:"Angular",
        completed:true
    
    }, 
    ], (error,result) =>{
        if(error){
            console.log("Unable to insert")
        }
        console.log(result.ops)
    })
})