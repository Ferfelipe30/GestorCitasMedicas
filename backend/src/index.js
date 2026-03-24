const express = require('express');
const pool = require('./config/db');
require('dotenv').config();

const usuariosRoutes = require('./routes/usuarios.routes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Express funcionando' });
});

app.use('/api/usuarios', usuariosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));