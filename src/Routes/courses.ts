import Router from 'express';
import { addCourse, course_testimonial_add, deleteCourse, editCourse, getCourse } from '../controllers/courses';
import { adminJWT } from '../helper';

const router = Router();

router.post('/testimonial',course_testimonial_add)
router.use(adminJWT)
router.post('/add',addCourse)
router.post('/edit',editCourse)
router.delete('/delete/:id',deleteCourse)
router.get('/',getCourse);


export const coursesRoutes = router;