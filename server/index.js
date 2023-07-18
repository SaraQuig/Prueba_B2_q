const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Usuario = require('./models/users');

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/R_Users', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión con MongoDB:'));
db.once('open', () => {
    console.log('Conexión exitosa con MongoDB');
});


app.post('/api/usuarios', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verificar si el usuario ya existe en la base de datos
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(409).json({ error: 'El usuario ya está registrado' });
        }

        // Encriptar la contraseña
        const hashedPassword = bcrypt.hashSync(password, 10);

        const nuevoUsuario = new Usuario({
            username,
            email,
            password: hashedPassword
            // El campo 'activo' se establecerá automáticamente en `true` por defecto
        });

        await nuevoUsuario.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});


app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});