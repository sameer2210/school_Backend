import { Router } from 'express';
import { addSchool, listSchools, showSchools } from '../controllers/school.controller.js';

const router = Router();

router.post('/addSchool', addSchool);
router.get('/listSchools', listSchools);
router.get('/showSchools', showSchools);

export default router;
