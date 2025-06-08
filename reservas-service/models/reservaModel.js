const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
    pacienteId: { type: mongoose.Schema.Types.ObjectId, required: true },
    medicoId: { type: mongoose.Schema.Types.ObjectId, required: true },
    fecha: { type: String, required: true },
    hora: { type: String, required: true }
});

module.exports = mongoose.model('Reserva', reservaSchema);