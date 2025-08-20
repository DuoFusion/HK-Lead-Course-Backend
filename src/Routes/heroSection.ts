import express from 'express';
import { adminJWT } from '../helper';
import { addHeroSection } from '../controllers/heroSection';

const router = express.Router();


router.use(adminJWT)
router.post('/add',addHeroSection)



export const heroSectionRoutes = router;