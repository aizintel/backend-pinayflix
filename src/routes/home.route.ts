import express from 'express';
import { pages } from '../controllers/home.controller';

const router = express.Router();

router.post('/pages', pages);

export default router;