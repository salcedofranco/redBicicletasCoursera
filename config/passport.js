const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Usuario = require("../models/usuario");

passport.use(new LocalStrategy (
    function(email, password, done){
        Usuario.findOne({email: email}, function (err, usuario){
            if (err) return done(err);
            if (!usuario) return done(null, false, { message:'Email no existente'} );
            if (!usuario.validPassword(password)) return done(null, false, {message:'Password incorrecto'});

            return done(null, user);
        });
    }

));

passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    Usuario.findById(id, function (err, usuario) {
      cb(err, usuario);
    });
});


module.exports = passport;