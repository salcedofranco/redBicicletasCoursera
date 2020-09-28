var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], 
        index: {
            type: '2dsphere', 
            sparse: true 
        }
    }
});

bicicletaSchema.statics.createInstance = function (code, color, modelo, ubicacion) {
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
};

bicicletaSchema.methods.toString = function () {
    return 'code: ' + this.code + ' | color: ' + this.color;
};

bicicletaSchema.statics.allBicis = function (cb) {
    return this.find({}, cb);
};

bicicletaSchema.statics.add = function (oBici, cb) {
    this.create(oBici, cb);
};

bicicletaSchema.statics.findByCode = function (ncode, cb) {
    return this.findOne({ code: ncode }, cb);
};

bicicletaSchema.statics.removeByCode = function (ncode, cb) {
    return this.deleteOne({ code: ncode }, cb);
};

module.exports = mongoose.model('Bicicleta', bicicletaSchema);


/*

var Bicicleta = function (id, color, modelo, ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo,
    this.ubicacion = ubicacion;
}

Bicicleta.prototype.toString = function () {
    return 'id: ' + this.id + " | color: " + this.color;
}

Bicicleta.allBicis = [];
Bicicleta.add = function(aBici){
    Bicicleta.allBicis.push(aBici);
}

Bicicleta.findById = function(aBiciId){
    var aBici = Bicicleta.allBicis.find(x => x.id == aBiciId);
    if (aBici)
        return aBici;
    else 
        throw new Error(`No existe una bicicleta con el id ${aBiciId}`);
}

Bicicleta.removeById = function(aBiciId) {
    var aBici = Bicicleta.findById(aBiciId); 
    for(var i = 0; i < Bicicleta.allBicis.length; i++){
        if (Bicicleta.allBicis[i].id == aBiciId){
            Bicicleta.allBicis.splice(i, 1);
            break;
        }
    }
}


/* PASO BICICLETAS POR DEFAULT 
var a = new Bicicleta(1, 'rojo', 'urbana', [-32.986816,-68.882142]);
var b = new Bicicleta(2, 'azul', 'urbana', [-32.985938,-68.881638]);

Bicicleta.add(a);
Bicicleta.add(b);

module.exports = Bicicleta;
*/

