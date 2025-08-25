import express from 'express';
import { addCoupon, deleteCoupon, getCoupon, updateCoupon} from '../controllers/aplyCoupon';

const router = express.Router();

router.post('/add',addCoupon)
router.get('/',getCoupon)
router.post('/edit',updateCoupon)
router.delete('/delete/:id',deleteCoupon)

export const aplyCouponRoutes = router;