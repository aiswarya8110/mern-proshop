import express from 'express';
import connectDB from './config/db.js';
import products from './data/products.js'
import { configDotenv } from 'dotenv';
import productRouter from './routes/ProductRoutes.js';

configDotenv();

connectDB();

const app = express();

app.get('/', (req, res)=>{
    res.send("hello from server");
})

app.use('/api/products', productRouter);

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT || 5000}`);    
})