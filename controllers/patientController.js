import Patient from '../models/Patient.js';

const addPatients = async (req, res) => {
  const patient = new Patient(req.body);
  patient.veterinary = req.veterinary._id;

  try {
    const patientSaved = await patient.save();

    res.json(patientSaved);
  } catch (error) {
    console.log(error);
  }
};

const getPatients = async (req, res) => {
  const patients = await Patient.find()
    .where('veterinary')
    .equals(req.veterinary);

  res.json(patients);
};

const addPatient = async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);

  if (!patient) {
    res.status(404).json({ msg: 'Not found' });
  }

  if (patient.veterinary._id.toString() !== req.veterinary._id.toString()) {
    return res.json({ msg: 'invalid action' });
  }

  res.json(patient);
};

const updatePatient = async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);

  if (!patient) {
    res.status(404).json({ msg: 'Not found' });
  }

  if (patient.veterinary._id.toString() !== req.veterinary._id.toString()) {
    return res.json({ msg: 'invalid action' });
  }

  //Update patient
  patient.name = req.body.name || patient.name;
  patient.owner = req.body.owner || patient.owner;
  patient.email = req.body.email || patient.email;
  patient.date = req.body.date || patient.date;
  patient.symptoms = req.body.symptoms || patient.symptoms;

  try {
    const upgradedPatient = await patient.save();
    res.json(upgradedPatient);
  } catch (error) {
    console.log(error);
  }
};
const deletePatient = async (req, res) => {
  const { id } = req.params;
  const patient = await Patient.findById(id);

  if (!patient) {
    res.status(404).json({ msg: 'Not found' });
  }

  if (patient.veterinary._id.toString() !== req.veterinary._id.toString()) {
    return res.json({ msg: 'invalid action' });
  }

  try {
    await patient.deleteOne();
    res.json({ msg: 'patient eliminated' });
  } catch (error) {
    console.log(error);
  }
};

export { addPatients, getPatients, addPatient, updatePatient, deletePatient };
