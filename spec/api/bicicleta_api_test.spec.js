var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

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