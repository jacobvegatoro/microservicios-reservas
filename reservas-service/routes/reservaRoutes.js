const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.post('/', reservaController.crearReserva);
router.get('/', reservaController.listarReservas);
router.delete('/:id', reservaController.cancelarReserva);

module.exports = router;