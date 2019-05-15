const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,

        validate(value){
            if( !(validator.isEmail(value) )) {
                throw new Error('Invalid email is provided')
            }
        }
    },
    age:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error('Age cannot be negative')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:7,
        lowercase:true,

        validate(value){
            if(value.includes('password')){
                throw new Error('Password should be equal to string password')
            }
        }
        
    }
})

userSchema.statics.findByCredentials = async(email,password)=>{
    const user = await User.findOne({ email })
    console.log(user)
    if(!user){
        throw new Error('Unable to Login 1')
    }
    const hashPP = await bcrypt.hash(password, 8)
    console.log('hashed: ',hashPP)
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to Login 2')
    }
    return user
}

//To hash the password
userSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
        console.log('hashed DB',user.password)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User