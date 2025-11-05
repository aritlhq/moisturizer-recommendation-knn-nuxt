import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import 'dotenv/config';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function updateDatabaseWithImages(pool) {
    console.log('🔄 Memperbarui database dengan URL gambar dari products_with_images.json...');
    const imagesJsonPath = path.join(__dirname, 'products_with_images.json');

    if (!fs.existsSync(imagesJsonPath)) {
        console.error('❌ File products_with_images.json tidak ditemukan.');
        return;
    }

    const productsWithImages = JSON.parse(fs.readFileSync(imagesJsonPath, 'utf-8'));

    if (productsWithImages.length === 0) {
        console.log('⚠️ Tidak ada produk untuk diupdate.');
        return;
    }

    console.log(`💡 Menemukan ${productsWithImages.length} produk di file JSON. Memulai proses update...`);
    // LOG CONTOH DATA PERTAMA
    console.log('👀 Contoh data pertama dari JSON:', productsWithImages[0]);


    let updatedCount = 0;
    let productsWithUrlCount = 0;
    for (const product of productsWithImages) {
        if (product.id && product.image_url) {
            productsWithUrlCount++;
            try {
                const [result] = await pool.query(
                    'UPDATE products SET image_url = ? WHERE id = ?',
                    [product.image_url, product.id]
                );
                // LOG HASIL UPDATE
                if (result.affectedRows > 0) {
                    updatedCount++;
                } else {
                    console.log(`⚠️  Peringatan: Tidak ada baris yang cocok untuk diupdate dengan ID: ${product.id}`);
                }
            } catch (error) {
                console.error(`❌ Gagal update produk ID ${product.id}:`, error);
            }
        }
    }
    console.log(`\n📊 Ringkasan:`);
    console.log(`   - Total produk di JSON: ${productsWithImages.length}`);
    console.log(`   - Produk dengan URL gambar: ${productsWithUrlCount}`);
    console.log(`   - Produk yang berhasil diupdate di DB: ${updatedCount}`);
    console.log(`✅ Proses update selesai.`);
}

async function main() {
    let pool;
    try {
        pool = mysql.createPool({
            host: process.env.NUXT_DB_HOST,
            port: process.env.NUXT_DB_PORT,
            user: process.env.NUXT_DB_USER,
            password: process.env.NUXT_DB_PASSWORD,
            database: process.env.NUXT_DB_NAME,
        });
        await updateDatabaseWithImages(pool);
    } catch (error) {
        console.error('❌ Gagal terhubung atau menjalankan update:', error);
    } finally {
        if (pool) await pool.end();
        process.exit(0);
    }
}

main();