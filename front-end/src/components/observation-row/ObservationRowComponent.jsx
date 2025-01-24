import "./ObservationRowComponent.css";
import React, { useState } from "react";
import { deleteChekinPatient } from "../../services/chekinService";

function ObservationRowComponent(props) {
  const { patientId, chekin, setChekins } = props;
  
  const [ setSuccessMessage] = useState("");

  

  const handleDelete = async () => {
  
    try {
      
      const response = await deleteChekinPatient(patientId, chekin.id);
      
      
      if (response.status === "success") {
        const updatedChekins = response.data;
        console.log('entra a exitoso ')
        setChekins(updatedChekins);  
      } else {
        throw new Error(response.message || "Error desconocido al eliminar el check-in");
      }
    } catch (error) {
      throw error;
    }
  };
  

  return (
    <div className="observationRow">
      <div className="observationRow_name">
        <p className="detailpatient__info-item-title">{chekin.doctor}</p>
        <button className="delete-icon" onClick={handleDelete}>
          <i class="fa-regular fa-trash-can fa-lg"></i>
        </button>
      </div>
      <p>{chekin.doctorTitle}</p>
      <p>{chekin.notes}</p>
      <div className="observationRow_date">
        <p>{chekin.time}</p>
        <p>{chekin.date}</p>
      </div>
    </div>
  );
}

export default ObservationRowComponent;
