const express = require('express');
const router = express.Router();
const agendaController = require('../controllers/agendaController');

router.post('/', agendaController.definirDisponibilidad);
router.get('/:medicoId', agendaController.obtenerDisponibilidadPorMedico);
router.get('/:medicoId/:fecha', agendaController.obtenerPorFecha);

module.exports = router;