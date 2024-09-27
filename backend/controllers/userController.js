import asyncHandler from 'express-async-handler';
import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';

// @desc    Login User & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async(req, res)=>{
    const { email, password } = req.body;
    const existingUser = await User.findOne({email});

    if(!existingUser || !(await existingUser.matchPassword(password))){
        res.status(401).send("invalid email or password");
        throw new Error("Invalid email or password");
    }
    else{
        generateToken(existingUser._id, res);
        res.json({
            _id: existingUser._id,
            name: existingUser.name,
            email: existingUser.email,
            isAdmin: existingUser.isAdmin,
        })
    }
})


// @desc    Register User 
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res)=>{
    const { name, email, password } = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        res.json({message: "User already exists"});
        throw new Error("User already exists");
    }

    const newUser = await User.create({
        name,
        email,
        password,
    });

    generateToken(newUser._id, res);

    res.status(201).send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin
    })
}) 

// @desc    Logout User / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res)=>{
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date()
    })

    res.status(200).send({message: "Logged out"})
}

// @desc    Get User Profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);

    res.status(200).send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    })
})

// @desc    Update User Profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async(req, res)=>{
    const { name, email, password } = req.body;
    const user = await User.findById(req.user._id);

    if(user){
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }else{
        res.status(404);
        throw new Error("User not found");
    }
})

// @desc Get Users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async(req, res)=>{
    const users = await User.find().select("-password");

    if(users){
        res.status(200).json(users);
    }else{
        res.status(404).send("No users found");
        throw new Error("No Users found.");
    }
})

// @desc Delete User
// @route DELETE /api/users/:id/delete
// @access Private/Admin
const deleteUser = asyncHandler(async(req, res)=>{
    const userId = req.params.id;
    await User.deleteOne({_id: userId});

    res.status(200).send("User deleted.");
})

// @desc Get Users
// @route GET /api/users
// @access Private/Admin
const updateUser = asyncHandler(async(req, res)=>{
    const userId = req.params.id;
    const { email, password, isAdmin } = req.body;
    
    const user = await User.findById(userId);

    user.email = email || user.email;
    user.password = password || user.password;
    user.isAdmin = isAdmin;

    const updatedUser = await user.save();
    
    res.status(200).json(updatedUser);
});

// @desc Get User By Id
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async(req, res)=>{
    const userId = req.params.id;

    const user = await User.findOne({_id: userId});

    res.status(200).json(user);
})

export {
    loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    updateUser,
    getUserById,
}