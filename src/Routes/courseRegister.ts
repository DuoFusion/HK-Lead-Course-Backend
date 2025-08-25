import express from 'express'
import { adminJWT } from '../helper'
import { addCourseRegister, deleteCourseRegister, editcourseRegister, getCourseRegister, verifyRazorpayPayment } from '../controllers/courseRegister'


const router = express.Router()

router.post('/add',addCourseRegister)
router.post('/verify',verifyRazorpayPayment)

router.use(adminJWT)
router.post('/edit' ,editcourseRegister)
router.get('/',getCourseRegister)
router.delete('/delete/:id',deleteCourseRegister)

export const CourseRegisterRoutes = router