var Bicicleta = require('../../models/bicicleta');

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