const express = require('express');
const pool = require('./config/db');
require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Express funcionando' });
});

app.get('/api/usuarios', async (_req, res) => {
  try {
    const {rows} = await pool.query(
      'SELECT usuario_id, username, password, rol FROM usuarios ORDER BY usuario_id ASC'
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.get('/api/usuarios/:id', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT usuario_id, username, password, rol FROM usuarios WHERE usuario_id = $1',
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado'});
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
});

app.post('/api/usuarios', async (req, res) => {
  try {
    const { username, password, rol } = req.body;
    if (!username || !password || !rol) return res.status(400).json({ error: 'Faltan campos requeridos'});

    const { rows } = await pool.query(
      'INSERT INTO usuarios (username, password, rol) VALUES ($1, $2, $3) RETURNING usuario_id, username, password, rol',
      [username, password, rol]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    if (error.code === '23505') return res.status(409). json({ error: 'Username ya existe'});
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/usuarios/:id', async (req, res) => {
  try {
    const { username, password, rol } = req.body;
    if (!username || !password || !rol) return res.status(400).json({ error: 'Faltan campos requeridos'});

    const { rows } = await pool.query(
      'UPDATE usuarios SET username = $1, password = $2, rol = $3 WHERE usuario_id = $4 RETURNING usuario_id, username, password, rol',
      [username, password, rol, req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    if (error.code === '23505') return res.status(409).json({ error: 'Username ya existe' });
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/usuarios/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM usuarios WHERE usuario_id = $1 RETURNING usuario_id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado', usuario_id: result.rows[0].usuario_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));