const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // Estado activo por defecto al registrarse
    activo: { type: Boolean, default: true } 
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
