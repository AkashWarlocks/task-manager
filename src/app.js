const express = require('express')
var bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()

const port = process.env.PORT || 3000

app.use(
    bodyParser.json()
)

app.post('/users', async(req,res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(200).send(user)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            "data":user,
            "status":error
        })
    }
})

app.post('/tasks', async(req,res) => {
    console.log(req.body)
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(200).send("success")

    } catch (error) {
        res.status(400).send({
            "data":task,
            "status":error
        })

    }
})


app.get('/users',async(req,res)=>{

   const users= await  
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})
app.post('/user/login',async(req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password)
        res.send(user)

    } catch (error) {
        console.log("in error", error)
        res.status(400).send(error)
    }
})

app.get('/users/:id',(req,res)=>{
    const _id = req.params.id
    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(400).send('User not found')
        }

        res.send(user)

    }).catch((e)=>{
        res.status(400).send(e)
    })
})
app.post('/updateUser',async (req,res)=>{
    const upUsers = Object.keys(req.body)
    try {
        const user = await User.findById(req.body._id)
        //const user = await Us`er.findByIdAndUpdate(req.body._id,req.body,{new:true,runValidators:true})
        upUsers.forEach((upUser)=>user[upUser] = req.body[upUser])
        await user.save()
        if(!user){
            return res.status(404).send()
        }

        res.send(user)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

app.get('/tasks',(req,res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

app.get('/tasks/:id',(req,res)=>{
    const _id = req.params.id
    Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send({
                "DAta":"task not found"
            })
        }
        res.send(task)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

// const myFn = async()=>{
//     const password = 'Sam123@#'
//     const hashPP = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashPP)

//     const isMatch = await bcrypt.compare('Sam123@#', hashPP)
//     console.log(isMatch)
// }

// myFn()



app.listen(port, () => {
    console.log('Server is running on port' + port)
}) 