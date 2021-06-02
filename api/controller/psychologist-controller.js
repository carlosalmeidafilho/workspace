const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 
//RETORNA AS INFORMAÇÕES DE UM PACIENTE ESPECIFICO
exports.getAllpsychologist = async (req, res, next) => {
  try {
    const query = `SELECT * FROM tabpsychologist;`;
    const result = await mysql.execute(query)
    const response = {
      length: result.length,
      psychologists: result.map(psy => {
        return {
          id: psy.idpsychologist,
          name: psy.name,
          sex: psy.sex,
          age: psy.age,
          phone: psy.phone,
          city: psy.city,
          state: psy.state,
          crp: psy.crp,
          epsi: psy.epsi,
          yearofformation: psy.yearofformation,
          institution: psy.institution,
          specialty: psy.specialty,
          approach: psy.approach,

          request: {
            type: 'GET',
            description: 'Returns data from a psychologist.',
            }
          }
      })
    }
    return res.status(200).send(response);
  } catch (error) {
      return res.status(500).send({ error: error });
  }
};

//RETORNA AS INFORMAÇÕES DE UM PACIENTE ESPECIFICO
exports.getPsychologist = async (req, res, next) => {
  try {
    userQuery = `SELECT * FROM tabuser WHERE iduser = ?;`
    patientQuery = `SELECT * FROM tabpsychologist WHERE tabuser_iduser = ?;`;

    const userResults = await mysql.execute(userQuery, [req.params.idpsychologist]);
    const psychologistResults = await mysql.execute(patientQuery, [req.params.idpsychologist]);

    if (psychologistResults.length == 0) {
      return res.status(409).send({ message: "Psychologist not found." })
    }
 
    const response = {
      psychologist: {
        id_psychologist : psychologistResults[0].idpsychologist,
        name : psychologistResults[0].name,
        sex : psychologistResults[0].sex,
        age : psychologistResults[0].age,
        phone : psychologistResults[0].phone,
        city : psychologistResults[0].city,
        state : psychologistResults[0].state,
        crp : psychologistResults[0].crp,
        epsi : psychologistResults[0].epsi,
        yearofformation: psychologistResults[0].yearofformation,
        institution: psychologistResults[0].institution,
        specialty: psychologistResults[0].specialty,
        approach: psychologistResults[0].approach,
        email: userResults[0].email,
      },
      request: {
        type: "GET",
        description: "Returns a psychologist."
      }
    }

    return res.status(201).send(response);
  } catch (error) {
      return res.status(500).send({ error: error });
  }
};

//ALTERA OS DADOS DE UM PSICOLOGO
exports.updatePsychologist = async (req, res, next) => {
  try {
    getUserQuery = `SELECT * FROM tabuser WHERE iduser = ?;`;
    const userResults = await mysql.execute(getUserQuery, [req.params.idpsychologist]);

    getPsychologistQuery = `SELECT * FROM tabpsychologist WHERE tabuser_iduser = ?;`;
    const psychologistResults = await mysql.execute(getPsychologistQuery, [req.params.idpsychologist]);

    if (userResults.length == 0 || psychologistResults.length == 0) {
      return res.status(409).send({ message: "Psychologist not found." })
    }

    const psychologistQuery = `UPDATE tabpsychologist SET name = ?, sex = ?, age = ?, phone = ?, city = ?, state = ?, crp = ?, epsi = ?, yearofformation = ?, institution = ?, specialty = ?, approach = ? WHERE tabuser_iduser = ?;`;
    const userQuery = `UPDATE tabuser SET email = ?, password = ? WHERE iduser = ?;`;

    await mysql.execute(psychologistQuery, [
      req.body.name,
      req.body.sex,
      req.body.age,
      req.body.phone,
      req.body.city,
      req.body.state,
      req.body.crp,
      req.body.epsi,
      req.body.yearofformation,
      req.body.institution,
      req.body.specialty,
      req.body.approach,
      req.params.idpsychologist
    ]);
    
    const hash = await bcrypt.hashSync(req.body.password, 10);
    await mysql.execute(userQuery, [
      req.body.email,
      hash,
      req.params.idpsychologist
    ]);

    const response = {
      upatedPsychologist: {
        name: req.body.name,
        sex: req.body.sex,
        age: req.body.age,
        phone: req.body.phone,
        city: req.body.city,
        state: req.body.state,
        crp: req.body.crp,
        epsi: req.body.epsi,
        yearofformation: req.body.yearofformation,
        institution: req.body.institution,
        specialty: req.body.specialty,
        approach: req.body.approach,
        email: req.body.email,
      },
      request: {
        type: 'PATCH',
        description: 'Psychologist updated successfully.',
      },
    }
    return res.status(202).send(response);
  } catch (error) {
  console.log(error);
  return res.status(500).send({ error: error });
  }
};