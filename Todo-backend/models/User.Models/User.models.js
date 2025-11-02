import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        
    },
    otpExpires: { type: Date }  ,
    profilePicture:{
        type:String,
        default:"",
        required:false
    },
    lastlogin:{
        type:Date,
        default:Date.now()
    },
    todos: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Todo"
    }],
},{
    timestamps:true,
})

//!schema to model

const User = mongoose.model("User",userSchema);
export default User;