const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());
app.use(morgan('dev'));

const validarToken = (req, res, next) => {
    if (req.path === '/usuarios/login' || req.path === '/usuarios') return next();
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token requerido' });
    try {
        const decoded = jwt.verify(token, 'secreto-super-clave');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: 'Token inválido' });
    }
};

app.use(validarToken);

// Rutas hacia usuarios-service
app.use('/usuarios', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://usuarios-service:3001${req.originalUrl}`,
            //url: `http://localhost:3001${req.originalUrl}`,
            data: req.body,
            headers: { Authorization: req.headers.authorization }
        });
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json(err.response?.data || { error: 'Error en usuarios-service' });
    }
});

// Rutas hacia agenda-service
app.use('/agenda', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://agenda-service:3002${req.originalUrl}`,
            //url: `http://localhost:3002${req.originalUrl}`,
            data: req.body
        });
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json(err.response?.data || { error: 'Error en agenda-service' });
    }
});

// Rutas hacia reservas-service
app.use('/reservas', async (req, res) => {
    try {
        const response = await axios({
            method: req.method,
            url: `http://reservas-service:3003${req.originalUrl}`,
            //url: `http://localhost:3003${req.originalUrl}`,
            data: req.body
        });
        res.status(response.status).json(response.data);
    } catch (err) {
        res.status(err.response?.status || 500).json(err.response?.data || { error: 'Error en reservas-service' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API Gateway escuchando en puerto ${PORT}`);
});