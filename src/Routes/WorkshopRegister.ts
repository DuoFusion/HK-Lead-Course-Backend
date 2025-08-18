import express from 'express';
import { addWorkShopRegister, getworkshopRegister, updateworkshopRegister } from '../controllers/workshopRegister';

const router = express.Router()

router.post('/add',addWorkShopRegister)
router.post('/edit',updateworkshopRegister)
router.get('/',getworkshopRegister)



export const workshopRegisterRoutes = router;
