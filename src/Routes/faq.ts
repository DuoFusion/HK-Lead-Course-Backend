import express from 'express';
import { adminJWT } from '../helper';
import { addFAQ, deleteFAQ, editFAQ, getFAQ } from '../controllers/faq';

const router = express.Router();

router.use(adminJWT)
router.post('/add',addFAQ)
router.post('/edit',editFAQ)
router.get('/',getFAQ)
router.delete('/delete/:id',deleteFAQ)

export const faqRoutes = router