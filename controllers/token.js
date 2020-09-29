var Usuario = require('../models/usuario');
var Token = require('../models/token');

exports.confirmation_get = function (req, res, next) {
    Token.findOne({ token: req.params.token }, function (err, token) {
        if (!token) {
            return res.status(400).send({
                type: 'not-verified',
                msg: 'No se encontró un usuario con éste token. Quizas haya expirado y deba solicitarlo nuevamente.'
            });
        }

        Usuario.findById(token.usuario, function (err, usuario) {
            if (!usuario) {
                return res.status(400).send({
                    msg: 'No se encontró un usuario con éste token.'
                });
            }

            if (usuario.verificado) {
                return res.redirect('/usuarios');
            }

            usuario.verificado = true;
            usuario.save(function (err) {
                if (err) {
                    return res.status(500).send({ msg: err.message });
                }

                res.redirect('/');
            });
        });
    });
}