import mysql from 'mysql2/promise';

const config = useRuntimeConfig();

const pool = mysql.createPool({
    host: config.dbHost,
    port: Number(config.dbPort),
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;