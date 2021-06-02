const express = require('express');
const router = express.Router();

const patientController = require('../controller/patient-controller');

//PERFIL
router.get('/:idpatient', patientController.getPatient);

//ALTERAR PERFIL
router.patch('/:idpatient', patientController.updatePatient);

module.exports = router;