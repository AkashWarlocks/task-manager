const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect("mongodb://localhost:27017/task-manager-api", {
    useNewUrlParser:true,
    useCreateIndex:true
})


// const me = new User({
//     name:'Akash',
//     age:'22',
//     password:'myhome'
// })

// me.save().then(()=>{
//     console.log(me)
// }).catch((error)=>{
//     console.log(error)
// })

// const Fees = mongoose.model('Fees',{
//     name:{
//         type:String
//     },
//     amount:{
//         type:Number
//     },
//     paidStatus:{
//         type:Boolean
//     }
// })

// const me = new Fees({
//     name:"Akash",
//     amount:2000,
//     paidStatus:true
// })

// me.save().then(()=>{
//     console.log(me)

// }).catch(()=>{
//     console.log(error)
// })