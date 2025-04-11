import express from 'express';
import { pages, search } from '../controllers/home.controller';

const router = express.Router();

router.get('/pages', pages);
router.get('/search', search);

export default router;