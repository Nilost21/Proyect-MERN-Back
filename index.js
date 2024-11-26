import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import veterinaryRoute from './routes/veterinaryRoute.js';
import patientRoute from './routes/patientRoute.js';

const app = express(); //In this app variable we are going to have all the functionality required by the server
app.use(express.json());
dotenv.config(); // setting the environment variables

connectDB();

const allowedDomains = ['http://localhost:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedDomains.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use('/api/veterinary', veterinaryRoute);
app.use('/api/patient', patientRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server working correctly on port ${PORT} :)`);
});
