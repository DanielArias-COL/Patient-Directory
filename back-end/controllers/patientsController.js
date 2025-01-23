const { writePatientsFile, readPatientsFile } = require("../utils/utilities");
const patients = require("../data/patients.json");

const ERROR_MESSAGES = {
  PATIENT_NOT_FOUND: "Paciente no encontrado",
  CHECKIN_NOT_FOUND: "Check-in no encontrado",
};

const getAllPatients = (req, res) => {
  const patients = readPatientsFile();
  res.json({ status: "success", data: patients });
};

const getPatientById = (req, res) => {
  const { id } = req.params;
  const patients = readPatientsFile();
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return res.status(404).json({
      status: "error",
      message: `Paciente con ID ${id} no encontrado`,
    });
  }

  res.status(200).json({
    status: "success",
    data: patient,
    message: `Paciente con ID ${id} obtenido correctamente`,
  });
};

const getAllChekinsByPatientId = (req, res) => {
  const { id } = req.params;
  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return res.status(404).json({
      status: "error",
      message: `Paciente con ID ${id} no encontrado`,
    });
  }

  res.status(200).json({
    status: "success",
    data: patient.checkIns,
    message: `Check-ins del paciente con ID ${id} obtenidos correctamente`,
  });
};

const updatePatient = (req, res) => {
  const patients = readPatientsFile();

  const index = patients.findIndex((p) => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: ERROR_MESSAGES.PATIENT_NOT_FOUND,
    });
  }

  patients[index] = { ...patients[index], ...req.body };

  writePatientsFile(patients);

  res.json({
    status: "success",
    data: patients[index],
    message: "Paciente actualizado correctamente",
  });
};

module.exports = {
  getAllPatients,
  getPatientById,
  updatePatient,
  getAllChekinsByPatientId,
};
