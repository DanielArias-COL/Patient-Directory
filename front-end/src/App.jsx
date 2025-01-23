import { AppRouter } from "./routes/AppRouter";
import { PatientProvider } from './context/patientContext';

function App() {
  return (
    <PatientProvider>
          <AppRouter />
    </PatientProvider>    
  );
}

export default App;
