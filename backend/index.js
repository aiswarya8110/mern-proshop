import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { configDotenv } from 'dotenv';
import UserRouter from './routes/UserRoutes.js';
import ProductRouter from './routes/ProductRoutes.js';
import OrderRouter from './routes/orderRoutes.js';
import configCloudinary from './cloudinaryConfig.js';

configDotenv();

connectDB();

configCloudinary();

const app = express();

app.use(cookieParser());

app.use(express.json());


app.get('/', (req, res)=>{
    res.send("hello from server");
})


app.use('/api/products', ProductRouter);

app.use('/api/users', UserRouter);

app.use('/api/order', OrderRouter);

app.use((error, req, res, next)=>{
    console.log(error);
})

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT || 5000}`);    
})