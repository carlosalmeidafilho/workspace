const jwt = require('jsonwebtoken');

/*
  REQUIRED -> LOGIN OBRIGATORIO PARA UTILIZAR O METODO
  OPTIONAL -> LOGIN OPCIONAL PARA UTILIZAR O METODO
*/

exports.required = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).send({ mensagem: 'Authentication failed.' });
    }

}

exports.optional = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.user = decode;
        next();
    } catch (error) {
        next();
    }

} 