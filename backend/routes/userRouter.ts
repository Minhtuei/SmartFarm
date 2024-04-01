import { Router } from 'express';
import { createUser, getUserInfo, updateUserInfo } from '../controllers/userController';

const router = Router();
router.route('/:email').get(getUserInfo).put(updateUserInfo).post(createUser);
export { router };
