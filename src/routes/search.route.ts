import express from 'express';
import { latest, random } from '../controllers/search.controller';

const router = express.Router();

router.get('/latest', latest);
router.get('/random', random);

export default router;