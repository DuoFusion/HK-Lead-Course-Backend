import express from 'express'
import { adminJWT } from '../helper'

const router = express.Router()

router.use(adminJWT)
router.post('/add')

export const profileSettingRoutes = router