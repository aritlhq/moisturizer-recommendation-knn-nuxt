const bcrypt = require('bcrypt');
const db = require('../config/db');

async function createAdmin() {
  try {
    const username = 'admin';
    const password = 'admin123';

    console.log('🔐 Membuat admin user...\n');

    const hashedPassword = await bcrypt.hash(password, 10);

    const [existing] = await db.query(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    if (existing.length > 0) {
      await db.query(
        'UPDATE users SET password = ? WHERE username = ?',
        [hashedPassword, username]
      );
      console.log('✅ Admin user berhasil diupdate!');
    } else {
      await db.query(
        'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
        [username, hashedPassword, 'admin']
      );
      console.log('✅ Admin user berhasil dibuat!');
    }

    console.log('\nKredensial login:');
    console.log(`   Username: ${username}`);
    console.log(`   Password: ${password}`);
    console.log('\n⚠️  Jangan lupa ganti password untuk production!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createAdmin();
