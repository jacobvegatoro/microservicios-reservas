const axios = require('axios');

async function validarDisponibilidad(medicoId, fecha, hora) {
    try {
        const response = await axios.get(`http://localhost:3002/agenda/${medicoId}/${fecha}`);
        const disponibilidad = response.data;
        return disponibilidad.horas.includes(hora);
    } catch (error) {
        return false;
    }
}

module.exports = validarDisponibilidad;