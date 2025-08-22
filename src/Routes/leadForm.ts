import express from 'express'
import { adminJWT } from '../helper'
import { addLeadForm, deleteLeadForm, editLeadForm, getLeadForm } from '../controllers/leadForm'

const router = express.Router()

router.post('/add',addLeadForm)
router.use(adminJWT)
router.post('/edit',editLeadForm)
router.get('/',getLeadForm)
router.delete('/delete/:id',deleteLeadForm)


export const leadFormRoutes = router