const fs = require("fs");
const path = require("path");
const patients = require("../data/patients.json");
const Joi = require("joi");


const patientsFilePath = path.join(__dirname, "../data/patients.json");


const readPatientsFile = () => {
  const fileContent = fs.readFileSync(patientsFilePath, "utf8");
  return JSON.parse(fileContent);
};


const writePatientsFile = (patientsData) => {
  fs.writeFileSync(
    patientsFilePath,
    JSON.stringify(patientsData, null, 2),
    "utf8"
  );
};

const countCheckins = (patientId) => {
  const patient = patients.find((p) => p.id === patientId);

  if (!patient) {
    return -1;
  }

  return patient.checkIns.length;
};

const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();

  return `${day}/${month}/${year}`; 
};

const getCurrentTime = () => {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const time = `${hours}:${minutes} ${ampm}`;
  return time;
};


module.exports = {
  readPatientsFile,
  writePatientsFile,
  countCheckins,
  getCurrentDate,
  getCurrentTime
};
