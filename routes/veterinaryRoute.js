import express from 'express';
import {
  register,
  profile,
  confirm,
  authenticate,
  forgetPassword,
  checkToken,
  newPassword,
} from '../controllers/veterinaryController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Area
router.post('/', register);
router.get('/confirm/:token', confirm);
router.post('/login', authenticate);
router.post('/forget-password', forgetPassword);
router.route('/forget-password/:token').get(checkToken).post(newPassword);

//Private Area
router.get('/profile', checkAuth, profile);

export default router;
