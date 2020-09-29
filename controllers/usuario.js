var Usuario = require('../models/usuario');

exports.usuario_list = function (req, res, next) {
    Usuario.find({}, (err, usuarios) => {
        res.render('usuarios/index', { usuarios: usuarios });
    });
}

exports.usuario_create_get = function (req, res, next) {
    res.render('usuarios/create', { errors: {}, usuario: new Usuario() });
}

exports.usuario_create_post = function (req, res, next) {
    if (req.body.password != req.body.confirm_password) {
        res.render('usuarios/create', { 
            errors: { 
                confirm_password: {
                    message: 'No coincide con el password ingresado'
                } 
            },
            usuario: new Usuario({ nombre: req.body.nombre, email: req.body.email })
        });
        return;
    }

    Usuario.create({
        nombre: req.body.nombre, 
        email: req.body.email,
        password: req.body.password
    }, function (err, nuevoUsuario) {
        if (err) {
            res.render('usuarios/create', {
                errors: err.errors,
                usuario: new Usuario({ nombre: req.body.nombre, email: req.body.email })
            });
        } else {
            nuevoUsuario.enviar_email_bienvenida();
            res.redirect('/usuarios');
        }
    });
}

exports.usuario_update_get = function (req, res, next) {
    Usuario.findById(req.params.id, function (err, usuario) {
        res.render('usuarios/update', { errors: {}, usuario: usuario });
    });
}

exports.usuario_update_post = function (req, res, next) {
    var update_values = {
        nombre: req.body.nombre
    }

    Usuario.findByIdAndUpdate(req.params.id, update_values, function (err, usuario) {
        if (err) {
            console.log(err);
            res.render('usuarios/update', {
                errors: err.errors,
                usuario: new Usuario({ nombre: req.body.nombre, email: req.body.email })
            });
        } else {
            res.redirect('/usuarios');
            return;
        }
    });
}

exports.usuario_delete_post = function (req, res, next) {
    Usuario.findByIdAndDelete(req.body.id, function (err, usuario) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/usuarios');
            return;
        }
    });
}