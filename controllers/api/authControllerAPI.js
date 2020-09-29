const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../../models/usuario');

exports.authenticate = function (req, res, next) {
    Usuario.findOne({ email: req.body.email }, function (err, usuario) {
        if (err) {
            next(err);
        } else {
            if (usuario == null) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Invalido email/password!',
                    data: null
                });
            }

            if (usuario != null && bcrypt.compareSync(req.body.password, usuario.password)) {
                const token = jwt.sign({ id: usuario.id }, req.app.get('secretKey'), { expiresIn: '7d' });

                res.status(200).json({
                    message: 'Usuario encontrado!',
                    data: {
                        usuario: usuario,
                        token: token
                    }
                });
            } else {
                res.status(401).json({
                    status: 'error',
                    message: 'Invalido email/password!',
                    data: null
                });
            }
        }
    });
};

exports.forgotPassword = function (req, res, next) {
    Usuario.findOne({ email: req.body.email }, function (err, usuario) {
        if (!usuario) {
            res.status(401).json({
                message: 'No existe el usuario',
                data: null
            });
        }

        usuario.resetPassword(function (err) {
            if (err) {
                next(err);
            }

            res.status(200).json({
                message: 'Se envió un email para restablecer el password',
                data: null
            });
        });
    });
};

exports.authFacebookToken = function (req, res, next) {
    if (req.user) {
        req.user.save().then( () => {
            const token = jwt.sign({ id: req.user.id }, req.app.get('secretKey'), { expiresIn: '7d' });

            res.status(200).json({
                message: 'Usuario encontrado o creado!',
                data: {
                    user: req.user,
                    token: token
                }
            });
        }).catch( (err) => {
            console.log(err);
            res.status(500).json({ message: err.message });
        });

    } else {
        res.status(401);
    }
};