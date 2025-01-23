import api from "./axios-config";

export const getAllChekinsByPatientId = async (id) => {
  try {
    const response = await api.get(`/api/patients/${id}/chekins`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las observaciones", error);
    throw error;
  }
};

export const addChekinPatient = async (patientId, data) => {
  try {
    const response = await api.post(`/api/patients/${patientId}/chekins`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteChekinPatient = async (patientId, chekinId) => {
  try {
    const response = await api.delete(
      `/api/patients/${patientId}/chekins/${chekinId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
