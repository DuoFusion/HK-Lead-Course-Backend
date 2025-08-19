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
// import { userRouter } from './user'



const router = Router()
router.use('/auth', authRoutes)
router.use('/category', categoryRoutes)
// router.use('/category')
router.use('/workshop',workshopRoutes)
router.use('/workshopRegister',workshopRegisterRoutes)
router.use('/courses',coursesRoutes)
router.use('/courseRegister',CourseRegisterRoutes)
// router.use('/heroSection',)
router.use('/aplyCupan',aplyCupanRoutes)
router.use('/upload',uploadRoutes)
export { router }