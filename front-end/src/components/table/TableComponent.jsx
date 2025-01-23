import "./TableComponent.css";
import RowComponent from "../row/RowComponent";
import { usePatientContext } from "../../context/patientContext";

function TableComponent() {
  const { patients } = usePatientContext();

  return (
    <section className="directory">
      <h1>Directorio de pacientes</h1>
      <div className="table">
        <div className="table__column">
          <span className="table__column-item">ID</span>
          <span className="table__column-item">Paciente</span>
          <span className="table__column-item">Identificación</span>
          <span className="table__column-item">Celular</span>
          <span className="table__column-item">Entidad</span>
          <span className="table__column-item">Última Atención</span>
          <span className="table__column-item">Tipo de Atención</span>
          <span className="table__column-item">Estado</span>
        </div>

        {patients.map((patient) => (
          <RowComponent key={patient.id} patient={patient} />
        ))}
      </div>
    </section>
  );
}

export default TableComponent;
