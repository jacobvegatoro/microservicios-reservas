const Reserva = require('../models/reservaModel');
const validarDisponibilidad = require('../utils/validarDisponibilidad');

exports.crearReserva = async (req, res) => {
    const { pacienteId, medicoId, fecha, hora } = req.body;

    const disponible = await validarDisponibilidad(medicoId, fecha, hora);
    if (!disponible) {
        return res.status(400).json({ error: 'Horario no disponible' });
    }

    try {
        const reserva = new Reserva({ pacienteId, medicoId, fecha, hora });
        await reserva.save();
        res.status(201).json(reserva);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.listarReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find();
        res.json(reservas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.cancelarReserva = async (req, res) => {
    try {
        const reserva = await Reserva.findByIdAndDelete(req.params.id);
        if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
        res.json({ mensaje: 'Reserva cancelada' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};