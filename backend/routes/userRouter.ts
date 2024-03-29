import { Router } from 'express';
import { getUserInfo, updateUserInfo } from '../controllers/userController';

const router = Router();
router.route('/:userID').get(getUserInfo).patch(updateUserInfo);
export { router };
