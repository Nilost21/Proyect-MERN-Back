import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

const app = express(); //In this app variable we are going to have all the functionality required by the server

dotenv.config(); // setting the environment variables

connectDB();

app.use('/', (req, res) => {
  res.send('Hello Word');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server working correctly on port ${PORT} :)`);
});
