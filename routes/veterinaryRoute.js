import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('from API veterinarians');
});

router.get('/login', (req, res) => {
  res.send('from login');
});

export default router;
