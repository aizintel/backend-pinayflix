
import express from 'express';
import { pages } from '../controllers/mostPopular.controller';

const router = express.Router();

router.get('/pages', pages);


export default router;
