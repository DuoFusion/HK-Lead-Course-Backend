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
import { mentorsRoutes } from './mentors'
import { languageRoutes } from './language'
import { skillLevelRoutes } from './skillLevel';
import { whatYouLearnRoutes } from './whatYouLearn';
import { bannerRouts } from './banner';
import { aboutRoutes } from './about';
import { testomonialRoutes } from './testomonial';
import { faqRoutes } from './faq';
import { leadFormRoutes } from './leadForm';
import { interestRoutes } from './interest';
import { webSettingRoutes } from './webSetting';


const router = express.Router()
router.use('/auth', authRoutes)
router.use('/category', categoryRoutes)
router.use('/workshop', workshopRoutes)
router.use('/workshop-register', workshopRegisterRoutes)
router.use('/courses', coursesRoutes)
router.use('/course-register', CourseRegisterRoutes)
router.use('/banner',bannerRouts)
router.use('/mentors', mentorsRoutes)
router.use('/coupon-code', aplyCupanRoutes)
router.use('/upload', uploadRoutes)
router.use('/language',languageRoutes)
router.use('/skill-level',skillLevelRoutes)
router.use('/what-you-learn',whatYouLearnRoutes)
router.use('/about',aboutRoutes)
router.use('/testomonial',testomonialRoutes)
router.use('/faq',faqRoutes)
router.use('/lead-form',leadFormRoutes)
router.use('/interest' , interestRoutes)
router.use('/web-setting',webSettingRoutes)

export { router }