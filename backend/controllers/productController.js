import { v2 as cloudinary } from 'cloudinary';
import asyncHandler from "express-async-handler";
import Product from "../models/product.js";
import { IMAGE_DIRECTORY } from '../constants/constants.js';

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

    res.json(product);
})

// @desc    Create Product
// @routes  POST /api/products/create
// @access  Private/Admin
export const createProduct = asyncHandler(async(req, res)=>{
  const product = await Product.create({
        user: req.user._id,
        name: "Sample Name",
        price: 0,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,
        totalPrice: 0,
        description: 'This is a sample description',
        numReviews: 0,
    })

    res.status(200).send(product);
    
})
// @desc    Update a single product
// @route   PUT /api/products/:id/update
// @access  Private/Admin
export const updateProduct = asyncHandler(async(req, res)=>{
    const { name, price, image, brand, category, stockCount, description } = req.body;
    const productId = req.params.id;
    const product = await Product.findById(productId);
    let generatedImage = product.image;

    const path = generatedImage.split("/");
    const fileName = path[path.length - 1];
    const imageId = fileName.split('.')[0];

    if(imageId[0] !== "sample"){
        // Destroying the previously uploaded image
        cloudinary.uploader.destroy(`${IMAGE_DIRECTORY}/${imageId}`, {
            resource_type: 'image',
        })
    }

    if(image.includes("data")){
        const { secure_url } = await cloudinary.uploader.upload(image, {
            folder: IMAGE_DIRECTORY
        });
        
        generatedImage = secure_url;
    }

    product.name = name;
    product.price = price;
    product.image = generatedImage;
    product.brand = brand;
    product.category = category;
    product.countInStock = stockCount;
    product.description = description;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
})
// @desc    Delete a Product
// @route   DELETE /api/products/:id/delete
// @access  Private/Admin
export const deleteProduct = asyncHandler(async(req, res)=>{
   const productId = req.params.id;
   await Product.deleteOne({_id: productId});

   res.status(200).json("Product deleted");
});