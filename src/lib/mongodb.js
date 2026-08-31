import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;
if(!MONGODB_URI)
{
    throw new Error("MONGODB_URI is not define in .env");  
}

export async function connectDB()
{
    try{
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connect successfully")
    }catch(error){
        console.log("MonggoDB connection error :", error);
         console.error("MongoDB connection error:", error);
    throw error;
    }
}
export default connectDB;