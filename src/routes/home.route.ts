import express from 'express';
import { pages } from '../controllers/home.controller';

const router = express.Router();

router.get('/pages', pages);

export default router;