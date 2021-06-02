const express = require('express');
const router = express.Router();

const psychologistController = require('../controller/psychologist-controller');

//Retorna todos os psicologos
router.get('/', psychologistController.getAllpsychologist);

//Retorna apenas um psicologo especifico
router.get('/:idpsychologist', psychologistController.getPsychologist);

//Altera dos dados de um psicologo
router.patch('/:idpsychologist', psychologistController.updatePsychologist);

module.exports = router; 