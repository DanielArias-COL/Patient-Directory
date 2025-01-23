import "./ObservationRowComponent.css";
import React, { useState } from "react";
import { getAllChekinsByPatientId } from "../../services/patientService";
import { deleteChekinPatient } from "../../services/chekinService";

function ObservationRowComponent(props) {
  const { patientId, chekin, setChekins } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleDeletex = async () => {
    setLoading(true);
    setError(null);

    try {
      await deleteChekinPatient(patientId, chekin.id);

      const updatedChekins = await getAllChekinsByPatientId(patientId);
      setChekins(updatedChekins);
    } catch (error) {
      setError(
        "Hubo un error al eliminar el check-in. Por favor, inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
  
    try {
      // Llamar al API para eliminar el check-in
      const response = await deleteChekinPatient(patientId, chekin.id);
      
      // Verificar si la respuesta fue exitosa
      if (response.status === "success") {
        const updatedChekins = response.data;
        console.log('entra a exitoso ')
        setChekins(updatedChekins);  
        setSuccessMessage(response.message || "Check-in eliminado con éxito");  // Mostrar el mensaje de éxito
      } else {
        throw new Error(response.message || "Error desconocido al eliminar el check-in");
      }
    } catch (error) {
      setError(error.message || "Hubo un error al eliminar el check-in. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
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
