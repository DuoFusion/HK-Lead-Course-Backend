import {Router} from 'express';
import { login, reset_password, signup } from '../controllers/auth';

const router = Router();


router.post('/signup',signup)
router.post('/login',login)
router.post('/resert-password',reset_password)


export const authRoutes = router;