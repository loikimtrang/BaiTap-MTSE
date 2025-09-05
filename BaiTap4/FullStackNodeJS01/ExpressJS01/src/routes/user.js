import express from 'express';
import { auth } from '../middleware/auth.js';
import { delay } from '../middleware/delay.js';
import {
  createUserCtrl, loginCtrl, getAccountCtrl, listUsersCtrl,
  forgotPasswordCtrl, resetPasswordCtrl
} from '../controllers/userController.js';

const router = express.Router();
router.all('*', delay(200));         

router.get('/hello', (_req, res) => res.status(200).json('Hello world api'));

router.post('/register', createUserCtrl);
router.post('/login',    loginCtrl);

router.get('/account', auth, getAccountCtrl);
router.get('/users',   auth, listUsersCtrl);

router.post('/forgot-password', forgotPasswordCtrl);
router.post('/reset-password',  resetPasswordCtrl);

export default router;
