import "./PatientDetailComponent.css";
import React, { useState, useEffect } from "react";
import PatientInfoComponent from "./PatientInfoComponent";
import PatientEditComponent from "./PatientEditComponent";

function PatientDetailComponent(props) {
  const { patient } = props;

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


  return (
    <>
      {isSectionInfoOpen && (
        <PatientInfoComponent
          patientData = {patientData}
          setIsSectionInfoOpen = {setIsSectionInfoOpen}
          setIsSectionEditOpen = {setIsSectionEditOpen}
        />
      )}

      {isSectionEditOpen && (
        <PatientEditComponent
        patientData = {patientData}
        setPatientData = {setPatientData}
        setIsSectionInfoOpen = {setIsSectionInfoOpen}
        setIsSectionEditOpen = {setIsSectionEditOpen}
      />
      )}
    </>
  );
}

export default PatientDetailComponent;
