import Veterinary from '../models/Veterinary.js';
import generateJWT from '../helpers/generateJWT.js';
import generateId from '../helpers/generateId.js';

const register = async (req, res) => {
  const { email } = req.body;

  const existUser = await Veterinary.findOne({ email });

  if (existUser) {
    const error = new Error('The user already exists');
    return res.status(400).json({ msg: error.message });
  }

  try {
    //Whe save the data of a new Veterinarian user
    const veterinary = new Veterinary(req.body);
    const veterinarianSaved = await veterinary.save(); // save() mongo method to save user

    res.json(veterinarianSaved);
  } catch (error) {
    console.log(`Error Register User: ${error}`);
  }
};

const profile = (req, res) => {
  const { veterinary } = req;
  res.json({ profile: veterinary });
};

const confirm = async (req, res) => {
  const { token } = req.params;

  const confirmUser = await Veterinary.findOne({ token });

  if (!confirmUser) {
    const error = new Error('Invalid token');
    return res.status(404).json({ msg: error.message });
  }

  try {
    confirmUser.token = null;
    confirmUser.confirmed = true;
    await confirmUser.save();

    res.json({ msg: 'user successfully confirmed ' });
  } catch (error) {
    console.log(`Error when confirming user: ${error}`);
  }
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  //Check if the user exist
  const user = await Veterinary.findOne({ email });
  if (!user) {
    const error = new Error('The user does not exist');
    return res.status(403).json({ msg: error.message });
  }

  //Check if the user is confirmed
  if (!user.confirmed) {
    const error = new Error('Your account is not confirmed');
    return res.status(403).json({ msg: error.message });
  }

  //Check the password
  if (await user.checkPassword(password)) {
    console.log('Correct password');
    //User Authentication
    res.json({ token: generateJWT(user.id) });
  } else {
    console.log('Incorrect password');
    const error = new Error('Incorrect password');
    return res.status(403).json({ msg: error.message });
  }
};

const forgetPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  const veterinaryExist = await Veterinary.findOne({ email });

  if (!veterinaryExist) {
    const error = new Error('Email does not exist');
    return res.status(400).json({ msg: error.message });
  }

  try {
    veterinaryExist.token = generateId();
    await veterinaryExist.save();

    res.json({ msg: 'Whe have sent an email with the instructions' });
  } catch (error) {
    console.log(error);
  }
};

const checkToken = async (req, res) => {
  const { token } = req.params;

  const validToken = await Veterinary.findOne({ token });

  if (validToken) {
    // Token is valid, user exist
    res.json({ msg: 'Valid token and user exist' });
  } else {
    const error = new Error('Invalid token');
    return res.status(400).json({ msg: error.message });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const veterinary = await Veterinary.findOne({ token });

  if (!veterinary) {
    const error = new Error('There was a mistake');
    return res.status(400).json({ msg: error.message });
  }

  try {
    veterinary.token = null;
    veterinary.password = password;
    console.log(veterinary);

    await veterinary.save();

    res.json({ msg: 'Password successfully modified' });
  } catch (error) {
    console.log(error);
  }
};

export {
  register,
  profile,
  confirm,
  authenticate,
  forgetPassword,
  checkToken,
  newPassword,
};
