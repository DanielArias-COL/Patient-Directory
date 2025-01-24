const {
  writePatientsFile,
  countCheckins,
  getCurrentDate,
  getCurrentTime,
} = require("../utils/utilities");
const patients = require("../data/patients.json");
const { param } = require("../routes/patientsRoutes");

getAllChekinsByPatientId = (req, res) => {
  const patient = patients.find((p) => p.id === req.params.id);

  if (!patient) {
    return res.status(404).json({ message: "Paciente no encontrado" });
  }

  res.json(patient.checkIns);
};

const addChekinPatient = (req, res) => {
  const { id } = req.params;
  const { notes } = req.body;

  const patient = patients.find((p) => p.id === id);

  if (!patient) {
    return res.status(404).json({
      status: "error",
      message: `Paciente con ID ${id} no encontrado`,
    });
  }

  if (!notes) {
    return res.status(400).json({
      status: "error",
      message: "La observación no cuenta con contenido",
    });
  }

  const newCheckInId = countCheckins(id) + 1;
  const date = getCurrentDate();
  const time = getCurrentTime();

  const newCheckIn = {
    id: newCheckInId,
    date,
    time,
    notes,
    doctor: "Dra. Camila Zapata Zuñiga",
    doctorTitle: "Médico General",
  };

  
  patient.checkIns.push(newCheckIn);

  try {
    writePatientsFile(patients);
    return res.status(200).json({
      status: "success",
      message: "Check-in agregado correctamente",
      data: patient.checkIns,
    });
  } catch (error) {
    console.error("Error al escribir en el archivo:", error);
    return res.status(500).json({
      status: "error",
      message: "Hubo un error al guardar los cambios",
    });
  }
};

const deleteCheckInPatient = (req, res) => {
  const patient = patients.find((p) => p.id == req.params.id);
  if (!patient) {
    return res.status(404).json({
      status: "error",
      message: "Paciente no encontrado",
    });
  }
  
  const checkInIndex = patient.checkIns.findIndex(
    (c) => c.id == req.params.checkInId
  );

  if (checkInIndex === -1) {
    return res.status(404).json({
      status: "error",
      message: "Check-in no encontrado",
    });
  }

  patient.checkIns.splice(checkInIndex, 1); 

  try {
    writePatientsFile(patients);
    res.status(200).json({
      status: "success",
      message: "Check-in eliminado con éxito",
      data: patient.checkIns, 
    });
  } catch (error) {
    console.error("Error al guardar los cambios:", error);
    res.status(500).json({
      status: "error",
      message: "Hubo un error al guardar los cambios",
    });
  }
};

module.exports = {
  getAllChekinsByPatientId,
  addChekinPatient,
  deleteCheckInPatient,
};
