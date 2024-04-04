import { SendPassword } from 'backend/controllers/emailController';
import { Router } from 'express';

const router = Router();
router.route('/').post(SendPassword);
export { router };
