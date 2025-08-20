"use strict"
import { Request, Router, Response } from 'express'
// import { userRouter } from './user'
import { userStatus } from '../common'
import { authRoutes } from './auth'
import { uploadRoutes } from './upload'
import { categoryRoutes } from './category'
import { aplyCupanRoutes } from './aplyCupan'
import { workshopRoutes } from './workshop'
import { workshopRegisterRoutes } from './WorkshopRegister'
import { coursesRoutes } from './courses'
import { CourseRegisterRoutes } from './courseRegister'
import { heroSectionRoutes } from './heroSection'
import { mentorsRoutes } from './mentors'
import { languageRoutes } from './language'
// import { userRouter } from './user'



const router = Router()
router.use('/auth', authRoutes)
router.use('/category', categoryRoutes)
router.use('/workshop', workshopRoutes)
router.use('/workshopRegister', workshopRegisterRoutes)
router.use('/courses', coursesRoutes)
router.use('/courseRegister', CourseRegisterRoutes)
router.use('/heroSection', heroSectionRoutes)
router.use('/Mentors', mentorsRoutes)
router.use('/aplyCupan', aplyCupanRoutes)
router.use('/upload', uploadRoutes)
router.use('/language',languageRoutes)
export { router }