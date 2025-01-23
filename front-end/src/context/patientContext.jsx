// patientContext.js
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { getAllPatients } from "../services/patientService";

const PatientContext = createContext({
  patients: [],
  isLoading: false,
  error: null,
  handleRefresh: () => {},
});

export const PatientProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPatients = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await getAllPatients();
      setPatients(response.data);
    } catch (err) {
      setError(err.message || "Error al cargar pacientes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const handleRefresh = useCallback(() => {
    fetchPatients();
  }, [fetchPatients]);

  return (
    <PatientContext.Provider
      value={{ patients, isLoading, error, handleRefresh }}
    >
      {children}
    </PatientContext.Provider>
  );
};

export const usePatientContext = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error(
      "usePatientContext debe usarse dentro de un PatientProvider"
    );
  }
  return context;
};
