var mongoose = require('mongoose');
var Reserva = require('./reserva');
const bcrypt = require("bcrypt");
const crypto = require("crypto");


const saltRounds = 10;

const uniqueValidator = require("mongoose-unique-validator");
const Token = require("../models/token");
const mailer = require("../mailer/mailer");

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


usuarioSchema.methods.enviar_email_bienvenida = function (cb) {
    const token = new Token({
      _userId: this.id,
      token: crypto.randomBytes(16).toString("hex"),
    });
    const email_destination = this.email;
    token.save(function (err) {
      if (err) {
        return console.log(err.message);
      }
  
      const mailOptions = {
        from: 'no-reply@redbicicletas.com',
        to: email_destination,
        subject: "Verificación de cuenta",
        text:
          "Hola,\n\n" +
          "Por favor, para verificar su cuenta haga click en este link: \n" +
          'http://localhost:3000' +
          "/token/confirmation/" +
          token.token +
          ".\n",
      };
      mailer.sendMail(mailOptions, function (err) {
        console.log(mailer);
        if (err) {
          return console.log(err.message);
        }
        console.log(
          "Se ha enviado un email de bienvenida a: " + email_destination
        );
      });
      cb(null);
    });
  };

  usuarioSchema.statics.findOneOrCreateByGoogle = function findOneOrCreate(condition, callback) {
    const self = this;
    console.log(condition);
    self.findOne({
       $or: [
          {'googleId': condition.id}, {'email': condition.emails[0].value}
    ]}, (err, result) => {
          if (result) {
             callback(err, result)
          } else {
             console.log('=========== CONDITION ===========');
             console.log(condition);
             let values = {};
             values.googleId = condition.id;
             values.email = condition.emails[0].value;
             values.nombre = condition.displayName || 'SIN NOMBRE';
             values.verificado = true;
             values.password = condition._json.etag;
             console.log('========== VALUES ============');
             console.log(values);
             self.create(values, (err, result) => {
                if (err) {console.log(err);}
                return callback(err, result)
             })
          }
    
    })
 };



module.exports = mongoose.model('Usuario', usuarioSchema);
