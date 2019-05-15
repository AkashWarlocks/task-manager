const mongoose = require('mongoose')
const validator = require('validator')

const Task = mongoose.model('Task', {
    taskName:{
        type:String,
        lowercase:true,
        required:true
    },
    taskStatus:{
        type:Boolean,
        required:true,
        default:false
    }
    
})

module.exports = Task