var express = require('express');
var router = express.Router();
var bicicletaController = require('../controllers/bicicleta');

router.get('/', bicicletaController.bicicleta_list);
router.get('/create', bicicletaController.bicicleta_create_get);
router.post('/create', bicicletaController.bicicleta_create_post);

router.get('/:code/update', bicicletaController.bicicleta_update_get);
router.post('/:code/update', bicicletaController.bicicleta_update_post);

//especificamos parametros con id de la bicicleta
router.post('/:code/delete', bicicletaController.bicicleta_delete_post);
router.get('/:code/show', bicicletaController.bicicleta_show_get);

module.exports = router;