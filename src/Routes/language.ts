import express from 'express'
import { adminJWT } from '../helper'
import { addLanguage, editLanguage } from '../controllers/language'

const router = express.Router()

router.use(adminJWT)
router.post('/add',addLanguage)
router.post('/edit',editLanguage)

export const languageRoutes = router