const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario');

router.get('/', usuarioController.usuario_list);
router.get('/create', usuarioController.usuario_create_get);
router.post('/create', usuarioController.usuario_create_post);
router.get('/:id/update', usuarioController.usuario_update_get);
router.post('/:id/update', usuarioController.usuario_update_post);
router.post('/:id/delete', usuarioController.usuario_delete_post);

module.exports = router;