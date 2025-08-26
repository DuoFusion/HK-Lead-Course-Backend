import express from 'express';
import { addCoupon, aplyCoupon, deleteCoupon, getCoupon, updateCoupon} from '../controllers/aplyCoupon';
import { adminJWT } from '../helper';

const router = express.Router();

router.get('/',getCoupon)
router.post('/aplyCoupon',aplyCoupon)
router.use(adminJWT)
router.post('/add',addCoupon)
router.post('/edit',updateCoupon)
router.delete('/delete/:id',deleteCoupon)


export const aplyCouponRoutes = router;