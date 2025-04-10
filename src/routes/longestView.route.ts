
import express from 'express';
import { search, pages } from '../controllers/longestView.controller.js';

const router = express.Router();

router.get('/pages', pages);
router.get('/search', search);

export default router;
