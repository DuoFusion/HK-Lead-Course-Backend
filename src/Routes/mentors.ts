import express from 'express';
import { adminJWT } from '../helper';
import { addMentors, deleteMentors, editMentors, getMentors } from '../controllers/mentors';


const router = express.Router();

router.use(adminJWT)
router.post('/add',addMentors)
router.get('/',getMentors)
router.post('/edit',editMentors)
router.delete('/delete/:id',deleteMentors)



export const mentorsRoutes = router;