const mysql = require('../mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//CADASTRO
exports.register = async (req, res, next) => {
  try {
    //VERIFICA SE O EMAIL JA ESTA CADASTRADO NA TABUSUARIO
    var email = await mysql.execute(`SELECT * FROM tabuser WHERE email = ?`, [req.body.email]);
    if (email.length > 0) {
        return res.status(409).send({ message: "E-mail already registered." })
    }

    //VERIFICA SE É PACIENTE
    if(req.body.type === "patient") {
      //VERIFICA SE O CPF JA FOI UTILIZADO
      var cpf = await mysql.execute(`SELECT * FROM tabpatient WHERE cpf = ?`, [req.body.cpf]);
      if (cpf.length > 0) {
          return res.status(409).send({ message: "CPF already registered." })
      }

      //VERIFICA SE O RG JA FOI UTILIZADO
      var rg = await mysql.execute(`SELECT * FROM tabpatient WHERE rg = ?`, [req.body.rg]);
      if (rg.length > 0) {
          return res.status(409).send({ message: "RG already registered." })
      }

      //CADASTRA NOVO USUARIO / PACIENTE
      const hash = await bcrypt.hashSync(req.body.password, 10);

      userQuery = `INSERT INTO tabuser (email, password, type) VALUES (?,?,?)`;
      const userResults = await mysql.execute(userQuery, [req.body.email,hash,req.body.type]);

      patientQuery = `
      INSERT INTO 
        tabpatient (name, sex, age, phone, city, state, cpf, rg, tabuser_iduser) 
      VALUES 
        (?,?,?,?,?,?,?,?,?)`;

      const patientResults = await mysql.execute(
        patientQuery, [
          req.body.name, 
          req.body.sex, 
          req.body.age, 
          req.body.phone, 
          req.body.city, 
          req.body.state, 
          req.body.cpf, 
          req.body.rg, 
          userResults.insertId]);

      const response = {
        message: "Patient successfully created.",
        createdPatient: {
          idpatient: patientResults.insertId,
          name: req.body.name,
          sex: req.body.sex,
          cpf: req.body.cpf,
          rg: req.body.rg,
          email: req.body.email,
          request: {
            type: "POST",
            description: "Register a patient."
          }
        }
      }
      return res.status(201).send(response);
    }

    //VERIFICA SE É PSICOLOGO
    if(req.body.type === "psychologist") {
      //VERIFICA SE O CRP JA FOI UTILIZADO
      var crp = await mysql.execute(`SELECT * FROM tabpsychologist WHERE crp = ?`, [req.body.crp]);
      if (crp.length > 0) {
          return res.status(409).send({ message: "CRP already registered." })
      }

      //VERIFICA SE É CADASTRADO NA PLATAFORMA E-PSI
      if (req.body.epsi === false) {
          return res.status(409).send({ message: "Psychologist not registered on e-Psi" })
      }

      //CADASTRA NOVO USUARIO / PSICOLOGO
      const hash = await bcrypt.hashSync(req.body.password, 10); 

      userQuery = `INSERT INTO tabuser (email, password, type) VALUES (?,?,?)`;
      const userResults = await mysql.execute(userQuery, [req.body.email,hash,req.body.type]);

      psychologistQuery = `
      INSERT INTO
       tabpsychologist (name, sex, age, phone, city, state, crp, epsi, yearofformation, institution, specialty, approach, tabuser_iduser) 
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;

      const psychologistResults = await mysql.execute(
        psychologistQuery, [
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
          userResults.insertId]);

      const response = {
        message: "Psychologist successfully created.",
        createdPsychologist: {
          idpsychologist: psychologistResults.insertId,
          name: req.body.name,
          sex: req.body.sex,
          cpf: req.body.crp,
          rg: req.body.epsi,
          email: req.body.email,
          request: {
            type: "POST",
            description: "Register a psychologist."
          }
        }
      }
      return res.status(201).send(response);
    }
  } catch (error) {
      return res.status(500).send({ error: error });
  }
};

//LOGIN
exports.login = async (req, res, next) => {
  try {
    const query = `SELECT * FROM tabuser WHERE email = ?`;
    var results = await mysql.execute(query, [req.body.email]);

    if (results.length < 1) {
      return res.status(401).send({ message: "Authentication failed." })
    }

    if (await bcrypt.compareSync(req.body.password, results[0].password)) {
      const token = jwt.sign({id: results[0].id, email: results[0].email}, process.env.JWT_KEY, {expiresIn: "1h"});
      return res.status(200).send({
        user:{
          type: results[0].type,
          id: results[0].iduser,
          email: results[0].email,
          token: token
        },
        request:{
          type: "POST",
          description: "Successfully authenticated."
        }
      });
    }
    return res.status(401).send({ message: "Authentication failed." })

  } catch (error) {
      return res.status(500).send({ message: "Authentication failed." });
  }
};
