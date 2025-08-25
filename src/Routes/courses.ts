import Router from 'express';
import { addCourse, course_testimonial_add, deleteCourse, editCourse, getCourse, getUserCourse } from '../controllers/courses';
import { adminJWT } from '../helper';

const router = Router();

router.post('/testimonial',course_testimonial_add)
router.get('/user',getUserCourse)

router.use(adminJWT)
router.post('/add',addCourse)
router.post('/edit',editCourse)
router.get('/',getCourse);
router.delete('/delete/:id',deleteCourse)


export const coursesRoutes = router;