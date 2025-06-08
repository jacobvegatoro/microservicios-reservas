const Disponibilidad = require('../models/disponibilidadModel');
const validarMedico = require('../utils/validarMedico');

exports.definirDisponibilidad = async (req, res) => {
    const { medicoId, fecha, horas } = req.body;

    // Validar si el ID corresponde a un médico válido
    const esMedicoValido = await validarMedico(medicoId);
    if (!esMedicoValido) {
        return res.status(400).json({ error: 'El ID no corresponde a un médico válido' });
    }

    try {
        const disponibilidad = await Disponibilidad.findOneAndUpdate(
            { medicoId, fecha },
            { horas },
            { upsert: true, new: true }
        );
        res.status(201).json(disponibilidad);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.obtenerDisponibilidadPorMedico = async (req, res) => {
    const { medicoId } = req.params;
    try {
        const disponibilidad = await Disponibilidad.find({ medicoId });
        res.json(disponibilidad);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.obtenerPorFecha = async (req, res) => {
    const { medicoId, fecha } = req.params;
    try {
        const disponibilidad = await Disponibilidad.findOne({ medicoId, fecha });
        if (!disponibilidad) {
            return res.status(404).json({ error: 'No hay disponibilidad' });
        }
        res.json(disponibilidad);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};