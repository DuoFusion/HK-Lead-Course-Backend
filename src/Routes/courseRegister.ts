import express from 'express'
import { adminJWT } from '../helper'
import { addCourseRegister, editcourseRegister } from '../controllers/courseRegister'


const router = express.Router()

router.use(adminJWT)
router.post('/add',addCourseRegister)
router.post('/edit' ,editcourseRegister)

export const CourseRegisterRoutes = router