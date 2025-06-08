const axios = require('axios');

async function validarMedico(medicoId) {
    try {
        const response = await axios.get(`http://localhost:3001/usuarios/${medicoId}`);
        const usuario = response.data;
        return usuario && usuario.tipo === 'medico';
    } catch (error) {
        return false;
    }
}

module.exports = validarMedico;