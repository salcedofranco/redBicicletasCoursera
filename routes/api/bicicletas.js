var express = require('express');
var router = express.Router();
var bicicletaControllerAPI = require('../../controllers/api/bicicletaControllerAPI');

router.get('/', bicicletaControllerAPI.bicicleta_list);
router.post('/create', bicicletaControllerAPI.bicicleta_create);
router.put('/update', bicicletaControllerAPI.bicicleta_update);
router.delete('/delete', bicicletaControllerAPI.bicicleta_delete);


module.exports = router;
