import express from 'express';
import { 
getUserProfile, 
getUsers, 
loginUser, 
logoutUser, 
registerUser, 
updateUserProfile 
} from '../controllers/userController.js';
import { protect, admin } from '../middleware.js/authMiddleware.js';

const UserRouter = express.Router();

UserRouter.route('/').post(registerUser).get(protect, admin, getUsers);
UserRouter.post('/logout', logoutUser);
UserRouter.post('/login', loginUser);
UserRouter.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default UserRouter;