import express from 'express';
import { adminJWT } from '../helper';
import { addMentors } from '../controllers/mentors';


const router = express.Router();

router.use(adminJWT)
router.post('/add',addMentors)



export const mentorsRoutes = router;