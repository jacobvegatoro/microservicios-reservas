const mongoose = require('mongoose');

const disponibilidadSchema = new mongoose.Schema({
    medicoId: { type: mongoose.Schema.Types.ObjectId, required: true },
    fecha: { type: String, required: true },
    horas: [{ type: String }]
});

module.exports = mongoose.model('Disponibilidad', disponibilidadSchema);