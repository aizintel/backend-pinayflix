
import express from 'express';
import { pages } from '../controllers/random.controller';

const router = express.Router();

router.post('/pages', pages);


export default router;
