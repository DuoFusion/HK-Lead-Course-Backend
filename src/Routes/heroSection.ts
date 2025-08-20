import express from 'express';
import { adminJWT } from '../helper';
import { addHeroSection, deleteHeroSection, editHeroSection, getHeroSection } from '../controllers/heroSection';

const router = express.Router();


router.use(adminJWT)
router.post('/add',addHeroSection)
router.post('/edit',editHeroSection)
router.get('/',getHeroSection)
router.delete('/delete/:id',deleteHeroSection)



export const heroSectionRoutes = router;