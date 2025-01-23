import { Route, Routes } from 'react-router-dom'
import  App  from '../App'
import PatientDetailComponent from '../components/patient-detail/PatientDetailComponent'
import TableComponent from '../components/table/TableComponent'

export const AppRouter = () => {
  return (
      <Routes>
        <Route path="/" element={<TableComponent />} />
        <Route path="/patients" element={<TableComponent />} />
        <Route path="/patientdetail" element={<PatientDetailComponent />} />
      </Routes>
  )
}
