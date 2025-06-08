const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

//mongoose.connect('mongodb://localhost:27017/usuarios', {
mongoose.connect('mongodb://usuarios-db:27017/usuarios', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

app.use('/usuarios', userRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Usuarios escuchando en puerto ${PORT}`);
});