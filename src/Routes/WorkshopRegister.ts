import express from 'express';
import { addWorkShopRegister, deleteworkshopRegister, getworkshopRegister, updateworkshopRegister } from '../controllers/workshopRegister';
import { adminJWT } from '../helper';

const router = express.Router()


router.post('/add',addWorkShopRegister)
router.use(adminJWT)
router.post('/edit',updateworkshopRegister)
router.get('/',getworkshopRegister)
router.delete('/delete/:id',deleteworkshopRegister)



export const workshopRegisterRoutes = router;
