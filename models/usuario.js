var mongoose = require('mongoose');
var Reserva = require('./reserva');
const bcrypt = require("bcrypt");

const saltRounds = 10;

var Schema = mongoose.Schema;

const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };
  

  //cuando usuario ingresa su mail se verifica la cuenta. En un paso
var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, "El nombre es requerido"],
      },

      email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "El email es requerido"],
        lowercase: true,
        validate: [validateEmail, "Por favor ingrese un email valido"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
      },

      password: {
        type: String,
        trim: true,
        required: [true, "El password es obligatorio"],
      },

    passwordResetToken: String,
    passwordResetTokenExpires: Date,
        verificado: {
            type: Boolean,
            default: false,
        },

});

//modulos o librerias aparte que debe incorporar mongoose
usuarioSchema.plugin(uniqueValidator, {
    message: "El {PATH} ya existe con otro usuario",
  });

//la function pre Indica que antes de save se ejecute la funcion.callback sobre el save
usuarioSchema.pre("save", function (next) {
    if (this.isModified("password")) {
      this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
  });


usuarioSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

usuarioSchema.methods.reservar = function(biciId, desde, hasta, cb){
    var reserva = new Reserva({usuario: this._id, bicicleta: biciId, desde: desde, hasta: hasta})
    console.log(reserva);
    reserva.save(cb);
}



module.exports = mongoose.model('Usuario', usuarioSchema);
