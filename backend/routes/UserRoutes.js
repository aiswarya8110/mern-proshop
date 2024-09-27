import express from 'express';
import { 
    deleteUser,
    getUserById,
getUserProfile, 
getUsers, 
loginUser, 
logoutUser, 
registerUser, 
updateUser, 
updateUserProfile 
} from '../controllers/userController.js';
import { protect, admin } from '../middleware.js/authMiddleware.js';

const UserRouter = express.Router();

UserRouter.route('/').post(registerUser).get(protect, admin, getUsers)
UserRouter.post('/logout', logoutUser);
UserRouter.post('/login', loginUser);
UserRouter.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
UserRouter.delete('/:id/delete', protect, admin, deleteUser)
UserRouter.put('/:id/update', protect, admin, updateUser);
UserRouter.get('/:id', protect, admin, getUserById);

export default UserRouter;