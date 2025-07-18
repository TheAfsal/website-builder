import express from 'express';
import * as generateController from '../controllers/generateController';

const router = express.Router();

router.post('/', generateController.generateContent);
router.post('/website', generateController.generateWebsite);

export default router;