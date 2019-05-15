require('../src/db/mongoose')

const Task = require('../src/models/task')

// Task.findByIdAndDelete('5c8fab35a3cf013244828265').then((task)=>{
//     console.log(task)

//     return Task.countDocuments({taskStatus:false}) 

// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount = async(id,status) =>{
    const deleteTask = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({taskStatus: status})
    return ({
        "data" : deleteTask,
        "count" :count
    })
}

deleteTaskAndCount('5ca057295fcf370c4cf59249',false).then((result)=>{
    console.log("data Deleted " ,result.data , "\n count of incompleted task: ",result.count)
}).catch((e)=>{
    console.log('error: ',e)
})

