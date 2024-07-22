import asyncHandler from "express-async-handler";
import Product from "../models/product.js";

// @desc  Fetch all products
// @routes  GET /api/products
// @access  public
export const getProducts = asyncHandler(async(req, res)=>{
    const products = await Product.find({});
    res.json(products);
})

// @desc   Fetch a Product
// @routes GET /api/products/:id
// @access public 
export const getProductById = asyncHandler(async(req, res)=>{
    const product = await Product.findById(req.params.id);

    if(product){
       return res.json(product);
    }
    
    res.status(404).json({message: 'Product not found'})

})