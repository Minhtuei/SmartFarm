import { Router } from 'express';
import { createUser, getUserInfo, updateUserInfo } from '../controllers/userController';
import { SendOTP } from 'backend/controllers/emailController';

const router = Router();
router.route('/:email').get(getUserInfo).put(SendOTP).post(createUser);
router.route('/:otp').put(updateUserInfo);
export { router };
