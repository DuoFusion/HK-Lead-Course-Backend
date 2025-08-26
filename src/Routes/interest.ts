import express from 'express';
import { adminJWT } from '../helper';
import { addInterest, deleteInterest, editInterest, getInterest } from '../controllers/interest';

const router = express.Router();

router.get('/',getInterest)
router.use(adminJWT)
router.post('/add',addInterest)
router.post('/edit',editInterest)
router.delete('/delete/:id',deleteInterest)


export const interestRoutes = router;