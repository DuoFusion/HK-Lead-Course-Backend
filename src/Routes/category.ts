import Router from 'express';
import { adminJWT } from '../helper';
import { createCategory, deleteCategory, editCategory, getCategories } from '../controllers/category';

const router = Router();

router.use(adminJWT)
router.post('/add',createCategory)
router.post('/edit',editCategory)
router.delete('/delete/:id',deleteCategory)
router.get('/',getCategories)

export const categoryRoutes = router;