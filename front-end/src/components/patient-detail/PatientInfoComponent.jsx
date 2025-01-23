import { convertToISO, convertFromISO } from "../../utils/helpers/fileUtils";
import ObservationRowComponent from "../observation-row/ObservationRowComponent";
import { addChekinPatient } from "../../services/chekinService";
import React, { useState, useEffect } from "react";
import { getAllChekinsByPatientId } from "../../services/patientService";

function PatientInfoComponent(propos) {
  const { patientData, setIsSectionInfoOpen, setIsSectionEditOpen } = propos;

  const [observacion, setObservacion] = useState("");
  const handleTextareaChange = (event) => setObservacion(event.target.value);

  const [chekins, setChekins] = useState([]);
  useEffect(() => {
    getAllChekinsByPatientId(patientData.id).then((response) =>
      setChekins(response.data)
    );
  }, [patientData.id]);

  const handleSave = async () => {
    try {
      const response = await addChekinPatient(patientData.id, {
        notes: observacion,
      });

      if (response.status === "success") {
        const updatedChekins = response.data;
        setChekins(updatedChekins);
        alert("¡Check-in guardado exitosamente!");
        setObservacion("");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="detailpatient">
      <h1 className="title">Información Paciente</h1>
      <div className="detailpatient__info">
        <div className="detailpatient__info-item">
          <label>
            <span className="detailpatient__info-item-title">Paciente</span>
            <p>{patientData.name}</p>
          </label>
        </div>
        <div className="detailpatient__info-item">
          <label>
            <span className="detailpatient__info-item-title">
              Fecha de nacimiento
            </span>
            <p>{patientData.birthday}</p>
          </label>
        </div>
        <div className="detailpatient__info-item">
          <label>
            <span className="detailpatient__info-item-title">Edad</span>
            <p>{patientData.age}</p>
          </label>
        </div>
        <div className="detailpatient__info-item">
          <label>
            <span className="detailpatient__info-item-title">
              Tipo de identificación
            </span>
            <p>{patientData.typeIdentification}</p>
          </label>
        </div>
        <div className="detailpatient__info-item">
          <label>
            <span className="detailpatient__info-item-title">
              Nº de identificación
            </span>
            <p>{patientData.cc}</p>
          </label>
        </div>
        <div className="detailpatient__info-item">
          <label>
            <span className="detailpatient__info-item-title">Celular</span>
          </label>
          <button
            className="icon-button"
            onClick={() => {
              setIsSectionInfoOpen(false);
              setIsSectionEditOpen(true);
              patientData.birthday = convertToISO(patientData.birthday);
              patientData.lastAttention = convertToISO(
                patientData.lastAttention
              );
            }}
          >
            <i className="fa-regular fa-pen-to-square fa-lg"></i>
          </button>
          <p>{patientData.cellPhone}</p>
        </div>
        <div className="detailpatient__info-item">
          <label>
            <span className="detailpatient__info-item-title">Teléfono</span>
            <p>{patientData.telephone}</p>
          </label>
        </div>
        <div className="detailpatient__info-item">
          <label>
            <span className="detailpatient__info-item-title">Dirección</span>
            <p>{patientData.address}</p>
          </label>
        </div>
        <div className="detailpatient__info-item">
          <label>
            <span className="detailpatient__info-item-title">Ocupación</span>
            <p>{patientData.occupation}</p>
          </label>
        </div>
      </div>
      <div className="detailpatien__observation">
        <label htmlFor="observacion">
          <span className="detailpatient__info-item-title">Observación</span>
          <textarea
            name="observacion"
            id="observacion"
            className="detailpatient__textarea"
            placeholder="Observación"
            value={observacion}
            onChange={handleTextareaChange}
          ></textarea>
        </label>
      </div>
      <div className="detailpatient__info-buttonsave-container">
        <a
          className="detailpatient__info-buttonsave"
          onClick={() => {
            handleSave();
          }}
        >
          Guardar
        </a>
      </div>
      <div className="observations">
        {chekins.map((chekin) => (
          <ObservationRowComponent
            key={chekin.id}
            patientId={patientData.id}
            chekin={chekin}
            setChekins={setChekins}
          />
        ))}
      </div>
    </div>
  );
}

export default PatientInfoComponent;
