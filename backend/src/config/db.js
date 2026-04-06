const {Pool} = require('pg');
require('dotenv').config();

const useSSL = process.env.DB_SSL === 'true';

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: useSSL ? { rejectUnauthorized: false } : false
});

pool.connect()
    .then(() => console.log('Conectado a la base de datos PostgreSQL de Google cloud'))
    .catch(err => console.error('Error de conexion: ', err));

module.exports = pool;