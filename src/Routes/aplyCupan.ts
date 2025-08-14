import express from 'express';
import { addCupan, getCupan } from '../controllers/aplyCupan';

const router = express.Router();

router.post('/add',addCupan)
router.get('/',getCupan)

export const aplyCupanRoutes = router;