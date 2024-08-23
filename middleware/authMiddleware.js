import jwt from 'jsonwebtoken';
import Veterinary from '../models/Veterinary.js';

const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const parts = req.headers.authorization.split(' ');
      token = parts[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.veterinary = await Veterinary.findById(decoded.id).select(
        '-password -token -confirmed'
      );

      return next();
    } catch (error) {
      const e = new Error('Invalid token');
      return res.status(403).json({ msg: e.message });
    }
  }

  if (!token) {
    const error = new Error('Invalid or on-existent token');
    res.status(403).json({ msg: error.message });
  }

  next();
};

export default checkAuth;
