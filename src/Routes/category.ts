import Router from 'express';
import { adminJWT } from '../helper';
import { createCategory, editCategory } from '../controllers/category';

const router = Router();

router.use(adminJWT)
router.post('/add',createCategory)
router.post('/edit',editCategory)

export const categoryRoutes = router;