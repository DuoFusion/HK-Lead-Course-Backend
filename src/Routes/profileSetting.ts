import express from 'express'
import { adminJWT } from '../helper'
import { add_edit_Profile_Setting, get_Profile_Setting } from '../controllers/profileSetting'

const router = express.Router()

router.use(adminJWT)
router.post('/add/edit',add_edit_Profile_Setting)
router.get('/',get_Profile_Setting)

export const profileSettingRoutes = router