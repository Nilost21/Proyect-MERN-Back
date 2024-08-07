import Veterinary from '../models/Veterinary.js';

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
  res.json({ msg: 'Showing profile' });
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
  const { email } = req.body;

  //Check if the user exist
  const userExist = await Veterinary.findOne({ email });
  if (!userExist) {
    const error = new Error('The user does not exist');
    return res.status(403).json({ msg: error.message });
  }

  //Check if the user is confirmed

  
};

export { register, profile, confirm, authenticate };
