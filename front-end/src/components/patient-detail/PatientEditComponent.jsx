import React, { useState } from "react";
import { convertFromISO } from "../../utils/helpers/fileUtils";
import { usePatientContext } from "../../context/patientContext";
import { updatePatient } from "../../services/patientService";

function PatientEditComponent(props) {
 
    const { patientData, setPatientData, setIsSectionEditOpen, setIsSectionInfoOpen } = props;

  const { handleRefresh } = usePatientContext();

  const handleInputChange = (e, field) => {
    const { value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [field]: value, 
    }));
  };

  const [patientState, setPatientState] = useState(patientData.state);

  const handleInputPatientState = (event) => {
    const newState = event.target.value;

    setPatientState(newState);

    setPatientData((prevData) => ({
      ...prevData,
      state: newState,
    }));
  };

    const handleUpdate = async () => {
      patientData.birthday = convertFromISO(patientData.birthday);
      patientData.lastAttention = convertFromISO(patientData.lastAttention);
  
      try {
        await updatePatient(patientData.id, patientData);
  
        alert("¡Datos del paciente actualizados!");
  
      } catch (error) {
        throw error;
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
    <div className="detailpatient">
      <h1 className="title">Edición Paciente</h1>
      <div className="detailpatient__info">
        {Object.keys(patientData)
          .slice(1, -1)
          .map((field) => (
            <div className="detailpatient__info-item" key={field}>
              <label>
                <span className="detailpatient__info-item-title">
                  {titleSelector(field).title}
                </span>
                <input
                  className="detailpatient__info-input"
                  type={titleSelector(field).type}
                  value={patientData[field]}
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
              value={patientState} 
              onChange={handleInputPatientState} 
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
  );
}

export default PatientEditComponent;
