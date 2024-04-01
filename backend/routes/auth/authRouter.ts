import { Router } from 'express';
// import { Response, Request } from "express";
import { login, updateToken } from '../../controllers/auth/authController';
const router = Router();

// router.get('/test/:str', (req: Request, res: Response) => {
//     req.session.test = generateToken(`${req.params.str}`);
//     res.send(`Hey Geek! Session is set! Now Go to
//     <a href="/login/test1">/get</a> to retrieve the session.`);
// });
// router.get('/test1', (req: Request, res: Response) => {
//     try{
//         const test = req.session.test || 'No session set';
//     res.send(`Session variable: ${test}`);
//     }
//     catch(err){
//         console.error(err)
//     }
// });

router.post('/', login);
router.post('/updateToken', updateToken);
export { router };
