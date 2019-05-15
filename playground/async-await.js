
const add =(a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(a<0 || b<0 ){
                reject('NUmbers shoud be positive')
            }
            resolve(a+b)
        },2000)
    })
}

const doWork = async () =>{
   const sum =  await add(1,99)
   const sum1 =  await add(1,-1)

   return sum}

doWork().then((result)=>{
    console.log('result' ,result)
}).catch((error)=>{
    console.log(error)
})