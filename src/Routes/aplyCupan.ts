import express from 'express';
import { addCupan } from '../controllers/aplyCupan';

const router = express.Router();

router.post('/add',addCupan)

export const aplyCupanRoutes = router;