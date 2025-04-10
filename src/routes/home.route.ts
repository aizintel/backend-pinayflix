import express from 'express';
import { search, pages } from '../controllers/home.controller';

const router = express.Router();

router.get('/pages', pages);   // Endpoint to get page data
router.get('/search', search); // Endpoint to search

export default router;
