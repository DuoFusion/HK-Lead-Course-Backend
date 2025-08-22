import express from 'express';
import { adminJWT } from '../helper';
import { addAbout, deleteAbout, editAbout, getAbout } from '../controllers/about';

const router = express.Router();

router.use(adminJWT)
router.post('/add',addAbout)
router.post('/edit',editAbout)
router.get('/',getAbout)
router.delete('/delete/:id',deleteAbout)

export const aboutRoutes = router