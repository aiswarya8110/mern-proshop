import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/user.js';
import Product from './models/product.js';
import Order from './models/orders.js';
import connectDB from './config/db.js';

configDotenv();

connectDB();

console.log("USERS", users);

const addInitialDataToDatabase = async()=>{
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUserId = createdUsers[0]._id;

        const sampleProducts = products.map((product)=>{
            return {...product, user: adminUserId};
        });

        await Product.insertMany(sampleProducts);

        console.log("Sample data inserted in the database".green.inverse);

    } catch (error) {
        console.log(error+'.red.inverse');
    }
}


const destroyAllDatafromDatabase = async()=>{
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();


        console.log('All data deleted from the database'.green.inverse);
    } catch (error) {
        
    }
}

if(process.argv[2] === '-i'){ 
    addInitialDataToDatabase();
}
else{
    destroyAllDatafromDatabase();
}