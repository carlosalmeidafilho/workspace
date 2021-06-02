const express = require('express');
const router = express.Router();

const comumController = require('../controller/comum-controller');

//CADASTRO
router.post('/register', comumController.register);

//LOGIN
router.post('/login', comumController.login);

module.exports = router;