import express from 'express';
import {
  addPatients,
  getPatients,
  addPatient,
  updatePatient,
  deletePatient,
} from '../controllers/patientController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(checkAuth, addPatients).get(checkAuth, getPatients);

router
  .route('/:id')
  .get(checkAuth, addPatient)
  .put(checkAuth, updatePatient)
  .delete(checkAuth, deletePatient);

export default router;
