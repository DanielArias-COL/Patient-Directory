const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const patientsRoutes = require('./routes/patientsRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/patients', patientsRoutes);

app.listen(PORT, () => console.log(`Servidor ejecutándose en http://localhost:${PORT}`));
