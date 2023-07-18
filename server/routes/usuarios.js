const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/users');

const router = express.Router();

router.post('/usuarios', async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        const nuevoUsuario = new Usuario({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});

module.exports = router;
