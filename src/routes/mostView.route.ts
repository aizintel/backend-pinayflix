
import express from 'express';
import { pages } from '../controllers/mostView.controller';

const router = express.Router();

router.get('/pages', pages);


export default router;
