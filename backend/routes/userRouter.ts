import { Router } from 'express';
import { getUserInfo, updateUserInfo } from '../controllers/userController';
// import createUser ................
const router = Router();
// router.route('/:email').put(updateUserInfo).post(createUser);
router.route('/').get(getUserInfo).put(updateUserInfo);
export { router };
