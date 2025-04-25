
import express from 'express';
import { pages } from '../controllers/latest.controller';

const router = express.Router();

router.post('/', pages);


export default router;
