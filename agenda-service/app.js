const express = require('express');
const mongoose = require('mongoose');
const agendaRoutes = require('./routes/agendaRoutes');

const app = express();
app.use(express.json());

//mongoose.connect('mongodb://localhost:27017/agenda', {
mongoose.connect('mongodb://agenda-db:27017/agenda', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB Agenda'))
  .catch(err => console.error('Error conectando a MongoDB Agenda:', err));

app.use('/agenda', agendaRoutes);

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Agenda escuchando en puerto ${PORT}`);
});