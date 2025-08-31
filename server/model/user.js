import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/12225/12225935.png"

    },
  
},{timestamps:true})
const userModel = mongoose.model('User',userSchema)
export default userModel;