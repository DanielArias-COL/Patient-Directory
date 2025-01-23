import PatientDetailComponent from "../patient-detail/PatientDetailComponent";
import "./RowComponent.css";
import React, { useState } from "react";

function RowComponent(props) {
  const { patient } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModalInfoPatient = () => {
    setIsModalOpen(true);
  };

  const closeModalInfoPatient = () => {
    setIsModalOpen(false);
  };

  const getStateClass = (state) => {
    switch (state) {
      case "Estable":
        return "row__item-state-s";

      case "Moderado":
        return "row__item-state-m";

      case "Crítico":
        return "row__item-state-c";

      default:
        return "";
    }
  };

  return (
    <div className="row">
      <span className="row__item">{patient.id}</span>
      <span className="row__item">
        <a href="#" onClick={openModalInfoPatient}>
          {patient.name}
        </a>
      </span>
      <span className="row__item">{patient.cc}</span>
      <span className="row__item">{patient.cellPhone}</span>
      <span className="row__item">{patient.entity}</span>
      <span className="row__item">{patient.lastAttention}</span>
      <span className="row__item">{patient.typeAttention}</span>
      <span className="row__item">
        <div className={getStateClass(patient.state)}>{patient.state}</div>
      </span>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal__container">
            <div className="button_container">
              <button className="button_close" onClick={closeModalInfoPatient}>
                &times;
              </button>
            </div>
            <PatientDetailComponent
              key={patient.id}
              patient={patient}
              openModalInfoPatient={openModalInfoPatient}
              closeModalInfoPatient={closeModalInfoPatient}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default RowComponent;
