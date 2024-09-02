import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
const protect = asyncHandler(async(req, res, next )=>{
    let token;

    // Read the JWT from the cookie
    token = req.cookies.jwt;

    if(token){
        try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
         req.user = await User.findById(decoded._id).select('-password');
         next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed')
        }

    }else{
        res.status(401);

        throw new Error("Not Authorized, no token");
    }
})

// Admin middleware
const admin = asyncHandler((req, res, next)=>{
    if(req.user.isAdmin){
        next();
    }
    else{
        res.status(401);
        throw new Error('Not authorized as admin');
    }
})

export { protect, admin };