import mongoose from 'mongoose';

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_CONNECTION_URL);
        console.log("Database connected successfully.")
    }catch(error){
        console.log(`Unable to connect the database Error: ${error.message}`);
    }
}

export default connectDB;