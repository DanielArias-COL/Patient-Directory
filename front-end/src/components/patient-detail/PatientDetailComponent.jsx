import "./PatientDetailComponent.css";
import React, { useState, useEffect } from "react";
import ObservationRowComponent from "../observation-row/ObservationRowComponent";
import {
  getAllChekinsByPatientId,
  updatePatient,
} from "../../services/patientService";
import { addChekinPatient } from "../../services/chekinService";
import { convertToISO, convertFromISO } from "../../utils/helpers/fileUtils";
import { usePatientContext } from "../../context/patientContext";
import PatientInfoComponent from "./PatientInfoComponent";

function PatientDetailComponent(props) {
  const { patient } = props;

  const { handleRefresh } = usePatientContext();
  const [isSectionInfoOpen, setIsSectionInfoOpen] = useState(true);
  const [isSectionEditOpen, setIsSectionEditOpen] = useState(false);
  const [patientData, setPatientData] = useState({
    id : patient.id,
    name: patient.name,
    birthday: patient.birthday,
    age: patient.age,
    typeIdentification: patient.typeIdentification,
    cc: patient.cc,
    cellPhone: patient.cellPhone,
    telephone: patient.telephone,
    address: patient.address,
    occupation: patient.occupation,
    lastAttention: patient.lastAttention,
    typeAttention: patient.typeAttention,
    state: patient.state,
  });

  useEffect(() => {}, [patientData]);

  const [patientState, setPatientState] = useState(patient.state);
  const [observacion, setObservacion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chekins, setChekins] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [field]: value, // No necesitas conversión aquí porque el formato ya es yyyy-MM-dd
    }));
  };


  const handleInputPatientState = (event) => {
    const newState = event.target.value;

    setPatientState(newState);

    setPatientData((prevData) => ({
      ...prevData,
      state: newState,
    }));
  };

  const handleTextareaChange = (event) => setObservacion(event.target.value);
  // Obtener chekins
  useEffect(() => {
    getAllChekinsByPatientId(patient.id).then((response) => setChekins(response.data));
  }, [patient.id]);

  

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);
  
    try {
      // Asegúrate de enviar el patientId en los parámetros y la observación en el body.
      const response = await addChekinPatient(patient.id, { notes: observacion });
  
      // Verificar que la respuesta sea exitosa
      if (response.status === "success") {
        const updatedChekins = response.data;
        setChekins(updatedChekins);
        setSuccessMessage("¡Check-in guardado exitosamente!");
        alert("¡Check-in guardado exitosamente!");
        setObservacion(""); // Limpiar el campo de observación
      } else {
        setError("Hubo un error al guardar el check-in. Por favor, inténtalo de nuevo.");
      }
    } catch (error) {
      setError(error.message || "Hubo un error al guardar el check-in. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  

  const handleUpdate = async () => {
    setLoading(true); // Activa el estado de carga
    setError(null); // Reinicia el error
    patientData.birthday = convertFromISO(patientData.birthday);
    patientData.lastAttention = convertFromISO(patientData.lastAttention);

    try {
      // Actualiza los datos del paciente
      await updatePatient(patient.id, patientData);

      // Muestra un mensaje de éxito
      setSuccessMessage("¡Datos del paciente actualizados con éxito!");
      alert("¡Datos del paciente actualizados!");

      // Reinicia el campo de observación
      setObservacion("");
    } catch (error) {
      // Muestra un mensaje de error si algo falla
      setError(
        "Hubo un error al guardar el check-in. Por favor, inténtalo de nuevo."
      );
    } finally {
      // Desactiva el estado de carga
      setLoading(false);
    }
  };

  const titleSelector = (field) => {
    switch (field) {
      case "name":
        return { title: "Nombre", type: "text" };
      case "birthday":
        return { title: "Fecha de Nacimiento", type: "date" };
      case "age":
        return { title: "Edad", type: "number" };
      case "typeIdentification":
        return { title: "Tipo de Identificación", type: "select" };
      case "cc":
        return { title: "Número de Identificación", type: "text" };
      case "cellPhone":
        return { title: "Teléfono Celular", type: "tel" };
      case "telephone":
        return { title: "Teléfono Fijo", type: "tel" };
      case "address":
        return { title: "Dirección", type: "text" };
      case "occupation":
        return { title: "Ocupación", type: "text" };
      case "lastAttention":
        return { title: "Última Atención", type: "date" };
      case "typeAttention":
        return { title: "Tipo de Atención", type: "select" };
      case "state":
        return { title: "Estado", type: "select" };
      default:
        return { title: "Campo desconocido", type: "text" };
    }
  };

  return (
    <>
      {isSectionInfoOpen && (
        <PatientInfoComponent
          patientData = {patientData}
          setIsSectionInfoOpen = {setIsSectionInfoOpen}
          setIsSectionEditOpen = {setIsSectionEditOpen}
        />
      )}

      {/* Modal */}
      {isSectionEditOpen && (
        <div className="detailpatient">
          <h1 className="title">Edición Paciente</h1>
          <div className="detailpatient__info">
            {Object.keys(patientData)
              .slice(0, -1)
              .map((field) => (
                <div className="detailpatient__info-item" key={field}>
                  <label>
                    <span className="detailpatient__info-item-title">
                      {titleSelector(field).title}
                    </span>
                    <input
                      className="detailpatient__info-input"
                      type={titleSelector(field).type}
                      value={
                        patientData[field]
                      }
                      onChange={(e) => handleInputChange(e, field)} 
                    />
                  </label>
                </div>
              ))}

            <div className="detailpatient__info-item">
              <label>
                <span className="detailpatient__info-item-title">Estado</span>
                <select
                  className="detailpatient__info-input"
                  value={patientState} // Define el valor actual del select
                  onChange={handleInputPatientState} // Maneja los cambios de selección
                >
                  <option value="Estable">Estable</option>
                  <option value="Moderado">Moderado</option>
                  <option value="Crítico">Crítico</option>
                </select>
              </label>
            </div>
          </div>
          <div className="detailpatientedit__buttons-container">
            <a
              className="detailpatient__info-buttonsave"
              onClick={() => {
                setIsSectionEditOpen(false);
                setIsSectionInfoOpen(true);
              }}
            >
              Volver
            </a>
            <a
              className="detailpatient__info-buttonsave"
              onClick={async () => {
                await handleUpdate();
                setIsSectionEditOpen(false);
                setIsSectionInfoOpen(true);
                await handleRefresh();
              }}
            >
              Guardar
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default PatientDetailComponent;
