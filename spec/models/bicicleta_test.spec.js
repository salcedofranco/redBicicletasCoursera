var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testing Bicicleta', function(){
  beforeEach(function(done) {
    var mongoDB = 'mongodb://localhost/testdb';
    mongoose.disconnect();
    mongoose.connect(mongoDB, { useNewUrlParser: true });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'ERror de conexion'));
    db.once('open', function() {
      console.log('Estamos conectados a la base de datos!');
      done();
    });
  });

  afterEach(function(done) {
    Bicicleta.deleteMany({}, function(err, success){
      if (err) console.log(err);
      done();
    });
  });


  describe('Bicicleta.createInstance',() => {
    it('Crea una instancia de bicicleta', (done) => {
      var bici = Bicicleta.createInstance(1, "verde", "urbana", [-32.9, -68.8]);

      expect(bici.code).toBe(1);
      expect(bici.color).toBe("verde");
      expect(bici.modelo).toBe("urbana");
      expect(bici.ubicacion[0]).toEqual(-32.9);
      expect(bici.ubicacion[1]).toEqual(-68.8);

      done();

    })
  });

  
  describe('Bicicleta.allBicis', () => {
    it('comienza vacia', (done) => {
      Bicicleta.allBicis(function(err, bicis){
        expect(bicis.length).toBe(0);
        done();
      });
    });
  });


  
  describe('Bicicleta.add', () => {
    it('agragamos solo una bicicleta', (done) => {
      var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbano"});
      Bicicleta.add(aBici, function(err, newBici){
        if (err) console.log(err);
        Bicicleta.allBicis(function(err, bicis){
          expect(bicis.length).toEqual(1);
          expect(bicis[0].code).toEqual(aBici.code);

          done();
        });
      });
    });
  });

  describe('Bicicleta.findByCode', () => {
    it('Devolver bici con code 1', (done) => {
      Bicicleta.allBicis(function(err, bicis) {
        expect(bicis.length).toBe(0);

        var aBici = new Bicicleta({ code: 1, color: "verde", modelo: "urbano" });
        Bicicleta.add(aBici, function(err, newBici) {
          if (err) console.log(err);

          var aBici2 = new Bicicleta({ code: 2, color: "azul", modelo: "montaña" });
          Bicicleta.add(aBici2, function(err, newBici) {
            if (err) console.log(err);

            Bicicleta.findByCode(1, function(error, targetBici) {
              expect(targetBici.code).toBe(aBici.code);
              expect(targetBici.color).toBe(aBici.color);
              expect(targetBici.modelo).toBe(aBici.modelo);

              done();
            });
          });
        });
      });
    });
  });
});

/*

beforeEach(() => { Bicicleta.allBicis = []; }); //Nos blanquea la coleccion despues de cada test

describe('Bicicleta.allBicis', () => {
  it('comienza vacia', () => {
    expect(Bicicleta.allBicis.length).toBe(0);
  });
});

describe('Bicicletas.add', () => {
  it('Agregamos una', () => {
    expect(Bicicleta.allBicis.length).toBe(0); //compruebo lista vacia

    var a = new Bicicleta(1, 'rojo', 'urbana', [-32.986816,-68.882142]);
    Bicicleta.add(a);

    expect(Bicicleta.allBicis.length).toBe(1);
    expect(Bicicleta.allBicis[0]).toBe(a);

  });
});

describe('Bicicletas.findById', () => {
  it('debe devolver bici con id 1', () => {
    expect(Bicicleta.allBicis.length).toBe(0); //compruebo lista vacia

    var aBici = new Bicicleta(1, 'rojo', 'urbana');
    var aBici2 = new Bicicleta(2, 'negro', 'montaña');
    Bicicleta.add(aBici);
    Bicicleta.add(aBici2);

    var targetBici = Bicicleta.findById(1);
    expect(targetBici.id).toBe(1);
    expect(targetBici.color).toBe(aBici.color)
    expect(targetBici.modelo).toBe(aBici.modelo);

  })
})

*/