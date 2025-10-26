import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import 'dotenv/config';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function importData() {
    let pool;
    try {
        pool = mysql.createPool({
            host: process.env.NUXT_DB_HOST,
            port: process.env.NUXT_DB_PORT,
            user: process.env.NUXT_DB_USER,
            password: process.env.NUXT_DB_PASSWORD,
            database: process.env.NUXT_DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
        });

        console.log('🔄 Memulai import data dari dataset.csv...\n');

        const csvPath = path.join(process.cwd(), 'dataset.csv');

        if (!fs.existsSync(csvPath)) {
            console.error('❌ File dataset.csv tidak ditemukan di root proyek!');
            process.exit(1);
        }

        const csvContent = fs.readFileSync(csvPath, 'utf-8');
        const lines = csvContent.split('\n');
        const dataLines = lines.slice(1).filter(line => line.trim());

        console.log(`📊 Total baris data: ${dataLines.length}\n`);

        let successCount = 0;
        let errorCount = 0;

        console.log('🗑️  Menghapus data lama...');
        await pool.query('DELETE FROM products');
        console.log('✅ Data lama berhasil dihapus\n');

        console.log('📥 Mulai import data...');

        for (let i = 0; i < dataLines.length; i++) {
            const line = dataLines[i].trim();
            if (!line) continue;

            try {
                const parts = line.split(';');

                if (parts.length >= 4) {
                    const type = parts[0].trim();
                    const name = parts[1].trim();
                    const brand = parts[2].trim();
                    const lastPartSplit = parts[3].split(',');

                    if (lastPartSplit.length >= 3) {
                        const link = lastPartSplit[0].trim();
                        const skinType = lastPartSplit[1].trim();
                        const ingredient = lastPartSplit[2].trim();

                        if (!type || !name || !brand || !skinType || !ingredient || type.length > 100) {
                            errorCount++;
                            continue;
                        }

                        await pool.query(
                            'INSERT INTO products (name, brand, product_type, skin_type, main_ingredient, product_url, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
                            [name, brand, type, skinType, ingredient, link, null]
                        );
                        successCount++;
                    }
                }
            } catch (rowError) {
                errorCount++;
            }
        }

        console.log('\n✅ Import selesai!');
        console.log(`   - Berhasil: ${successCount} produk`);
        console.log(`   - Gagal: ${errorCount} baris\n`);

        console.log('📤 Membuat products.json untuk ML model...');
        const [products] = await pool.query(
            'SELECT id, name, brand, product_type, skin_type, main_ingredient, product_url FROM products ORDER BY id ASC'
        );

        const productsJsonPath = path.join(__dirname, 'products.json');
        fs.writeFileSync(productsJsonPath, JSON.stringify(products, null, 2), 'utf-8');
        console.log(`✅ products.json berhasil dibuat (${products.length} produk)\n`);

    } catch (error) {
        console.error('\n❌ Import gagal:', error);
    } finally {
        if (pool) await pool.end();
        process.exit(0);
    }
}

importData();