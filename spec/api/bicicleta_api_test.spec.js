var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

var base_url = "http://localhost:3000/api/bicicletas";

describe("Bicleta API", () => {
    beforeEach(function(done) {
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Error de conexion'));
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



    describe("GET BICICLETAS /", () => {
        it("Status 200", (done) => {
            request.get(base_url, function(err, response, body) {
                var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(0);
                done()
            });
        });
    });


    describe("POST BICICLETAS /create", () => {
        it("Status 200", (done) => {
            var headers = {'content-type' : 'application/json'};
            var aBici = '{ "id": 5, "color":"gris", "modelo":"montaña", "lat":-32.986816, "lng":-68.882142 }';
            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/create',
                body: aBici
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                var bici = JSON.parse(body).bicicleta;
                console.log(bici);

                expect(bici.color).toBe("gris");
                expect(bici.ubicacion[0]).toBe(-32);
                expect(bici.ubicacion[1]).toBe(-32);
                done();//hasta que no se ejecuta aca el test no termina
            });
        });
    });




});



/*
describe('Bicicleta API', () => {
    describe('GET BICICLETAS /', () => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);

            var a = new Bicicleta(1, 'rojo', 'urbana', [-32.986816,-68.882142]);
            Bicicleta.add(a);

            request.get('http://localhost:3000/api/bicicletas', function(error, response, body) {
                expect(response.statusCode).toBe(200);
            });
        });
    });


    describe('POST BICICLETAS /create', () => {
        it('Status 200', (done) => {
           var headers = {'content-type' : 'application/json'};
           var aBici = '{ "id": 5, "color":"gris", "modelo":"montaña", "lat":-32.986816, "lng":-68.882142 }';
    
            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/bicicletas/create',
                body: aBici
            }, function(error, response, body) {
                    expect(response.statusCode).toBe(200);
                    expect(Bicicleta.findById(5).color).toBe("gris");
                    done();//hasta que no se ejecuta aca el test no termina
            });
        });
    });
});

*/