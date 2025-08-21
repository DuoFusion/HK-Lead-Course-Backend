import express from 'express'
import { adminJWT } from '../helper'
import { addSkillLevel, deleteSkillLevel, editSkillLevel, getSkillLevel } from '../controllers/skillLevel'


const router = express.Router()

router.use(adminJWT)
router.post('/add',addSkillLevel)
router.post('/edit',editSkillLevel)
router.get('/',getSkillLevel)
router.delete('/delete/:id',deleteSkillLevel)


export const skillLevelRoutes = router