import { SendPassword } from 'backend/controllers/emailController';
import { Router } from 'express';

const router = Router();
router.route('/:email').post(SendPassword);
export { router };
