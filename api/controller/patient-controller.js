const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//RETORNA AS INFORMAÇÕES DE UM PACIENTE ESPECIFICO
exports.getPatient = async (req, res, next) => {
  try {
    userQuery = `SELECT * FROM tabuser WHERE iduser = ?;`
    patientQuery = `SELECT * FROM tabpatient WHERE tabuser_iduser = ?;`;

    const userResults = await mysql.execute(userQuery, [req.params.idpatient]);
    const patientResults = await mysql.execute(patientQuery, [req.params.idpatient]);

    if (patientResults.length == 0) {
      return res.status(409).send({ message: "Patient not found." })
    }

    const response = {
      patient: {
        id_patient : patientResults[0].idpatient,
        name : patientResults[0].name,
        sex : patientResults[0].sex,
        age : patientResults[0].age,
        phone : patientResults[0].phone,
        city : patientResults[0].city,
        state : patientResults[0].state,
        cpf : patientResults[0].cpf,
        rg : patientResults[0].rg,
        email: userResults[0].email,
      },
      request: {
        type: "GET",
        description: "Returns a patient."
      }
    }

    return res.status(201).send(response);
  } catch (error) {
      return res.status(500).send({ error: error });
  }
};

exports.updatePatient = async (req, res, next) => {
  try {

    getUserQuery = `SELECT * FROM tabuser WHERE iduser = ?;`;
    const userResults = await mysql.execute(getUserQuery, [req.params.idpatient]);

    getPacientQuery = `SELECT * FROM tabpatient WHERE tabuser_iduser = ?;`;
    const patientResults = await mysql.execute(getPacientQuery, [req.params.idpatient]);

    if (userResults.length == 0 || patientResults.length == 0) {
      return res.status(409).send({ message: "Patient not found." })
    }

    const patientQuery = `UPDATE tabpatient SET name = ?, sex = ?, age = ?, phone = ?, city = ?, state = ?, cpf = ?, rg = ? WHERE tabuser_iduser = ?;`;
    const userQuery = `UPDATE tabuser SET email = ?, password = ? WHERE iduser = ?;`;

    await mysql.execute(patientQuery, [
      req.body.name,
      req.body.sex,
      req.body.age,
      req.body.phone,
      req.body.city,
      req.body.state,
      req.body.cpf,
      req.body.rg,
      req.params.idpatient
    ]);

    const hash = await bcrypt.hashSync(req.body.password, 10);
    await mysql.execute(userQuery, [
      req.body.email,
      hash,
      req.params.idpatient
    ]);

    const response = {
      upatedPatient: {
        name: req.body.name,
        age: req.body.age,
        phone: req.body.phone,
        city: req.body.city,
        state: req.body.state,
        cpf: req.body.cpf,
        rg: req.body.rg,
        email: req.body.email,
      },
      request: {
        type: 'PATCH',
        description: 'Patient updated successfully.',
      },
    }

    return res.status(202).send(response);
  } catch (error) {
  console.log(error);
  return res.status(500).send({ error: error });
  }
};