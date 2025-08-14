import express from 'express';
import { addCupan, deleteCupan, getCupan, updateCupan } from '../controllers/aplyCupan';

const router = express.Router();

router.post('/add',addCupan)
router.get('/',getCupan)
router.post('/edit',updateCupan)
router.delete('/delete/:id',deleteCupan)

export const aplyCupanRoutes = router;