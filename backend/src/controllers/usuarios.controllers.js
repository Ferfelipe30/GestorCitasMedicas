const pool = require('../config/db');

//GET todos los usuarios
const getUsuarios = async (req, res) => {
    try {
        const result = await pool.query('SELECT usuario_id, username, password, rol FROM usuarios');
        res.json(result.rows);
    } catch ( err ) {
        res.status(500).json({ error: err.message });
    }
};

//GET usuario por ID
const getUsuarioById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT usuario_id, username, password, rol FROM usuarios WHERE usuario_id = $1',
            [id]
        );
        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//POST crear usuario
const createUsuario = async (req, res) => {
    try {
        const { username, password, rol } = req.body;

        if (!username || !password || !rol)
            return res.status(400).json({ error: 'Username, password y rol son requeridos' });

        const result = await pool.query(
            'INSERT INTO usuarios (username, password, rol) VALUES ($1, $2, $3) RETURNING usuario_id, username, password, rol',
            [username, password, rol]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505')
            return res.status(201).json({ error: 'Username ya existe' });
        res.status(500).json({ error: err.message });
    }
};

//PUT actualizar usuario
const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password, rol } = req.body;

        const result = await pool.query(
            'UPDATE usuarios SET username = COALESCE($1, username), password = COALESCE($2, password), rol = COALESCE($3, rol) WHERE usuario_id = $4 RETURNING usuario_id, username, password, rol',
            [username, password, rol, id]
        );
        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//DELETE eliminar usuario
const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'DELETE FROM usuarios WHERE usuario_id = $1 RETURNING usuario_id',
            [id]
        );
        if (result.rows.length === 0)
            return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json({ message: `Usuario "${result.rows[0].username}" eliminado correctamente` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario };