"use strict"
import express from 'express';
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
import { skillLevelRoutes } from './skillLevel';
import { whatYouLearnRoutes } from './whatYouLearn';



const router = express.Router()
router.use('/auth', authRoutes)
router.use('/category', categoryRoutes)
router.use('/workshop', workshopRoutes)
router.use('/workshop-register', workshopRegisterRoutes)
router.use('/courses', coursesRoutes)
router.use('/course-register', CourseRegisterRoutes)
router.use('/hero-section', heroSectionRoutes)
router.use('/mentors', mentorsRoutes)
router.use('/aply-cupan', aplyCupanRoutes)
router.use('/upload', uploadRoutes)
router.use('/language',languageRoutes)
router.use('/skill-level',skillLevelRoutes)
router.use('/what-you-learn',whatYouLearnRoutes)
export { router }