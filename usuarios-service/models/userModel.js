const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tipo: { type: String, enum: ['paciente', 'medico'], required: true }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.compararPassword = function (plain) {
    return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model('Usuario', userSchema);