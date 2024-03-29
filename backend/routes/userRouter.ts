import { Router } from 'express';
import { getUserInfo, updateUserInfo } from '../controllers/userController';

const router = Router();
router.route('/:email').get(getUserInfo).patch(updateUserInfo);
export { router };
