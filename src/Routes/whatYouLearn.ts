import express from 'express'
import { adminJWT } from '../helper'
import { addWhatYouLearn, deleteWhatYouLearn, editWhatYouLearn, getWhatYouLearn } from '../controllers/whatYouLearn'

const router = express.Router()

router.use(adminJWT)
router.post('/add',addWhatYouLearn)
router.post('/edit',editWhatYouLearn)
router.get('/',getWhatYouLearn)
router.delete('/delete/:id',deleteWhatYouLearn)


export const whatYouLearnRoutes = router