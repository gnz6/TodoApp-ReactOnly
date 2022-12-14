const mongoose = require("mongoose")
const {bcrypt, genSalt, hash, compare} = require("bcrypt")
const mongooseDelete = require("mongoose-delete")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    nickname: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    type: {
        type: String,
        enum: ["user", "admin", "superadmin", "member"],
        default: "user",
        required: true
    },
    projects:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects"
    }],
    favourites: [{
        type: String
    }],
    status: {
        type: String,
        enum: ["active", "banned", "inactive"],
        default: "active"
    },
    avatar:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/1946/1946429.png"
    }

}, {
    timestamps: true
})


UserSchema.statics.encryptPassword=async(password)=>{
    const salt = await genSalt(10)
    return await hash(password, salt)
    }
    
    
    UserSchema.statics.comparePassword=async(password, recievedPassword)=>{
        return await compare(password, recievedPassword)
    }  


UserSchema.plugin(mongooseDelete, {overrideMethods: "all"})

module.exports = mongoose.model("users", UserSchema)
