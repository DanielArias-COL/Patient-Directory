const express = require('express');
const router = express.Router();
const { getAllPatients, getPatientById, updatePatient} = require('../controllers/patientsController');
const { getAllChekinsByPatientId, addChekinPatient, deleteCheckInPatient} = require('../controllers/chekinsController');


router.get('/', getAllPatients);
router.get('/:id', getPatientById);
router.put('/:id', updatePatient);

router.get('/:id/chekins', getAllChekinsByPatientId);
router.post('/:id/chekins', addChekinPatient);
router.delete('/:id/chekins/:checkInId', deleteCheckInPatient);

module.exports = router;
