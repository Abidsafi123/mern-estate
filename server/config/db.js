import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const connection = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`connection successfull with mongodb atlas`)
        
    } catch (error) {
        console.log("error while connection to mongodb atlas",error)
        process.exit(1)
        
    }
}
export default connection;