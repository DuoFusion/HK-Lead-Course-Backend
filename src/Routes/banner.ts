import express from 'express';
import { addBanner, deleteBanner, editBanner, getBanner } from '../controllers/banner';
import { adminJWT } from '../helper';

const router = express.Router();

router.get('/',getBanner)

router.use(adminJWT)
router.post('/add',addBanner)
router.post('/edit',editBanner)
router.delete('/delete/:id',deleteBanner)



export const bannerRouts = router;