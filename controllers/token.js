var Usuario = require("../models/usuario");
var Token = require("../models/token");

module.exports = {
  confirmationGet: function (req, res, next) {
    Token.findOne({ token: req.params.token }, function (err, token) {
      console.log(token + " " + token._userId);
      if (!token)
        return res
          .status(400)
          .send({
            type: "not-verified",
            msg: "No se encontró usuario con ese token",
          });
      Usuario.findById(token._userId, function (err, usuario) {
        if (!usuario)
          return res.status(400).send({ msg: "No se encontró a ese usuario" });
        if (usuario.verificado) return res.redirect("/usuarios");
        usuario.verificado = true;
        usuario.save(function (err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          res.redirect("/");
        });
      });
    });
  },
};
