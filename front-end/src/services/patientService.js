import patientsData from '../assets/patientsData.json';
import api from './axios-config';
import {convertFromISO} from '../utils/helpers/fileUtils'

export const getPatients = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(patientsData);
    }); 
  });
};

export const getAllPatients = async () => {
  try {
    const response = await api.get('/api/patients/');
    return response.data; 
  } catch (error) {
    console.error('Error al obtener los pacientes', error);
    throw error; 
  }
};

export const getAllChekinsByPatientId = async (id) => {
  try {
    const response = await api.get(`/api/patients/${id}/chekins`);
    return response; 
  } catch (error) {
    console.error('Error al obtener las observaciones', error);
    throw error; 
  }
};

export const updatePatient = async (patientId, patientData) => {
  const response = await api.put(`/api/patients/${patientId}`, patientData); 
  return response.data; 
};

