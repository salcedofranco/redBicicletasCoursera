var Bicicleta = require('../models/bicicleta');

exports.bicicleta_list = function (req, res) {
    Bicicleta.allBicis(function (err, bicis) {
        res.render('bicicletas/index', { bicis: bicis });
    });
}

exports.bicicleta_create_get = function (req, res) {
    res.render('bicicletas/create');
}

exports.bicicleta_create_post = function (req, res) {
    var bici = new Bicicleta({
        code: req.body.code,
        color: req.body.color,
        modelo: req.body.modelo,
        ubicacion: [req.body.lat, req.body.lng]
    });

    Bicicleta.add(bici, function (err, newBici) {
        res.redirect('/bicicletas');
    });
}

exports.bicicleta_update_get = function (req, res) {
    Bicicleta.findByCode(req.params.code, function (err, bici) {
        res.render('bicicletas/update', { bici });
    });
}

exports.bicicleta_update_post = function (req, res) {
    Bicicleta.findByCode(req.params.code, function (err, bici) {
        bici.color = req.body.color;
        bici.modelo = req.body.modelo;
        bici.ubicacion = [req.body.lat, req.body.lng];
        bici.save();
        
        res.redirect('/bicicletas');
    });
}

exports.bicicleta_delete_post = function (req, res) {
    Bicicleta.removeByCode(req.body.code, function (err) {
        res.redirect('/bicicletas');
    });
}

exports.bicicleta_show_get = function (req, res) {
    Bicicleta.findByCode(req.params.code, function (err, bici) {
        res.render('bicicletas/show', { bici });
    });
}