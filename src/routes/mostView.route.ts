
import express from 'express';
import { pages } from '../controllers/mostView.controller';

const router = express.Router();

router.post('/', pages);


export default router;
