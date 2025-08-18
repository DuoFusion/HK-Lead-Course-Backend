import express from 'express';
import { addWorkshop, deleteWorkshop, getWorkshop, updateWorkshop } from '../controllers/workshop';


const router = express.Router();


router.post('/add',addWorkshop)
router.post('/edit',updateWorkshop)
router.get('/',getWorkshop)
router.delete('/delete/:id',deleteWorkshop)


export const workshopRoutes = router;
