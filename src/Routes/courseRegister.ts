import express from 'express'
import { adminJWT } from '../helper'
import { addCourseRegister, deleteCourseRegister, editcourseRegister, getCourseRegister } from '../controllers/courseRegister'


const router = express.Router()

router.use(adminJWT)
router.post('/add',addCourseRegister)
router.post('/edit' ,editcourseRegister)
router.get('/',getCourseRegister)
router.delete('/delete/:id',deleteCourseRegister)

export const CourseRegisterRoutes = router