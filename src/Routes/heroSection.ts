import express from 'express';
import { adminJWT } from '../helper';
import { addHeroSection, editHeroSection } from '../controllers/heroSection';

const router = express.Router();


router.use(adminJWT)
router.post('/add',addHeroSection)
router.post('/edit',editHeroSection)



export const heroSectionRoutes = router;