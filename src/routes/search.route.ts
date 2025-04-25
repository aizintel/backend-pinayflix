import express from 'express';
import { latest, random } from '../controllers/search.controller';

const router = express.Router();

router.post('/latest', latest);
router.post('/random', random);

export default router;