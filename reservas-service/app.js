const express = require('express');
const mongoose = require('mongoose');
const reservaRoutes = require('./routes/reservaRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/reservas', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB Reservas'))
  .catch(err => console.error('Error conectando a MongoDB Reservas:', err));

app.use('/reservas', reservaRoutes);

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Reservas escuchando en puerto ${PORT}`);
});