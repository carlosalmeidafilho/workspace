const BASE_API = 'http://192.168.15.5:3000';

export default {
    //CADASTRO PACIENTE
    signUpPat: async (name,sex, cpf, rg, email, password, type) => {
        const req = await fetch(`${BASE_API}/register`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, sex, cpf, rg, email, password, type})
        });
        const json = await req.json();
        console.log(json)
        return json;
    },
    //CADASTRO PSICOLOGO
    signUpPsy: async (nome, crp, email, senha, tipo) => {
        const req = await fetch(`${BASE_API}/register`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({nome, crp, email, senha, tipo})
        });
        const json = await req.json();
        console.log(json)
        return json;
    },
    //LOGIN 
    signIn: async (email, password) => {
        const req = await fetch(`${BASE_API}/login`, {
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const json = await req.json();
        return json;
    },
    //RETORNA DADOS DE UM PACIENTE
    getPatient: async (idpatient) => {
        const req = await fetch(`${BASE_API}/patient/${idpatient}`);

        const json = await req.json();
        return json;
    },
    //RETORNA DADOS DE UM PSICOLOGO
    getPsychologist: async (idpsychologist) => {
        const req = await fetch(`${BASE_API}/psychologist/${idpsychologist}`);

        const json = await req.json();
        return json;
    },
    //RETORNA DADOS DOS PSICOLOGOS
    getAllpsychologist: async () => {
        const req = await fetch(`${BASE_API}/psychologist/`);
        const json = await req.json();
        return json;
    },
    //ATUALIZA DADOS DE UM PACIENTE
    patchPatient: async (idpatient, name, sex, age, phone, city, state, cpf, rg, email, password) => {
        const req = await fetch(`${BASE_API}/patient/${idpatient}`, {
            method: 'PATCH',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, sex, age, phone, city, state, cpf, rg, email, password})
        });
		console.log(idpatient+" "+name+" "+sex+" "+age+" "+phone+" "+city+" "+state+" "+cpf+" "+rg+" "+email+" "+password);

        const json = await req.json();
        return json;
    },
    //ATUALIZA DADOS DE UM PACIENTE
    patchPsychologist: async (idpsychologist, name, sex, age, phone, city, state, crp, epsi, yearofformation, institution, specialty, approach, email, password) => {
        const req = await fetch(`${BASE_API}/psychologist/${idpsychologist}`, {
            method: 'PATCH',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idpsychologist, name, sex, age, phone, city, state, crp, epsi, yearofformation, institution, specialty, approach, email, password})
        });
		console.log(idpsychologist+" "+name+" "+sex+" "+age+" "+phone+" "+city+" "+state+" "+crp+" "+epsi+" "+yearofformation+" "+institution+" "+specialty+" "+approach+" "+email);

        const json = await req.json();
        return json;
    },

};