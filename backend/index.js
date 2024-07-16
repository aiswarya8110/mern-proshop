import express from 'express';
import connectDB from './config/db.js';
import products from './data/products.js'
import { configDotenv } from 'dotenv';

configDotenv();

connectDB();

const app = express();

app.get('/', (req, res)=>{
    res.send("hello from server");
})

app.get('/api/products', (req, res)=>{
    res.send(products);
});

app.get('/api/product/:id', (req, res)=>{
    const product = products.find((product)=> product._id === req.params.id);

    return res.send(product);
})

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT || 5000}`);    
})