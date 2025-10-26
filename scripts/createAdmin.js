import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import 'dotenv/config';
async function createAdmin() {
    let pool;
    try {
        pool = mysql.createPool({
            host: process.env.NUXT_DB_HOST,
            port: process.env.NUXT_DB_PORT,
            user: process.env.NUXT_DB_USER,
            password: process.env.NUXT_DB_PASSWORD,
            database: process.env.NUXT_DB_NAME,
        });

        const username = 'admin';
        const password = 'admin123';

        console.log('🔐 Membuat admin user...\n');

        const hashedPassword = await bcrypt.hash(password, 10);

        const [existing] = await pool.query(
            'SELECT id FROM users WHERE username = ?',
            [username]
        );

        if (existing.length > 0) {
            await pool.query(
                'UPDATE users SET password = ? WHERE username = ?',
                [hashedPassword, username]
            );
            console.log('✅ Admin user berhasil diupdate!');
        } else {
            await pool.query(
                'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
                [username, hashedPassword, 'admin']
            );
            console.log('✅ Admin user berhasil dibuat!');
        }

        console.log('\nKredensial login:');
        console.log(`   Username: ${username}`);
        console.log(`   Password: ${password}\n`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        if (pool) await pool.end();
        process.exit(0);
    }
}

createAdmin();