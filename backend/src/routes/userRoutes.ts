import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/verify', userController.verifyToken);
router.post('/logout', userController.logoutUser);

export default router;