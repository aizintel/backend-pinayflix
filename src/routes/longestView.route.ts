
import express from 'express';
import { pages } from '../controllers/longestView.controller';

const router = express.Router();

router.post('/pages', pages);


export default router;
