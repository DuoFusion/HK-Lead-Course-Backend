import Router from 'express';
import { addCourse } from '../controllers/courses';

const router = Router();

router.post('/add',addCourse)


export const coursesRoutes = router;