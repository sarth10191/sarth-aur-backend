import mongoose from "mongoose"
import { DBNAME } from "../constants.js"

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`)
        console.log("mongodb connected", `${connectionInstance.connection.host}`)
    }
    catch(error){
        console.log("ERROR:", error);
        process.exit(1);
    }
}

export default connectDB;