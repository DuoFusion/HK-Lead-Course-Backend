import express from 'express'
import { adminJWT } from '../helper'
import { addTestomonial, deleteTestomonial, editTestomonial, getTestomonial } from '../controllers/testomonial'


const router = express.Router()

router.use(adminJWT)
router.post('/add',addTestomonial)
router.post('/edit',editTestomonial)
router.get('/',getTestomonial)
router.delete('/delete/:id',deleteTestomonial)

export const testomonialRoutes = router 