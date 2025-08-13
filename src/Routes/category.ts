import Router from 'express';
import { adminJWT } from '../helper';
import { createCategory } from '../controllers/category';

const router = Router();

router.use(adminJWT)
router.post('/add',createCategory)

export const categoryRoutes = router;