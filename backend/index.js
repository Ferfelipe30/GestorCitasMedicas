const express = require('express');
const pool = require('./db');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API Express funcionando' });
});

app.get('/api/health/db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() AS now');
    res.json({ ok: true, db: 'up', now: result.rows[0].now });    
  }catch (error) {
    res.status(500).json({ ok: false, db: 'down', error: error.message });
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));