import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function importFromCsvAndScrape(pool) {
    console.log('🔄 Memulai import dari dataset.csv dan proses scraping...');

    const csvPath = path.join(process.cwd(), 'dataset.csv');
    if (!fs.existsSync(csvPath)) {
        throw new Error('❌ File dataset.csv tidak ditemukan di root proyek!');
    }

    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n');
    const dataLines = lines.slice(1).filter(line => line.trim());

    console.log(`📊 Total baris data: ${dataLines.length}`);

    let successCount = 0;
    let errorCount = 0;

    console.log('📥 Mulai import data dasar (tanpa gambar)...');
    for (const line of dataLines) {
        try {
            const parts = line.trim().split(';');
            if (parts.length < 4) continue;

            const type = parts[0].trim();
            const name = parts[1].trim();
            const brand = parts[2].trim();
            const lastPartSplit = parts[3].split(',');

            if (lastPartSplit.length < 3) continue;

            const link = lastPartSplit[0].trim();
            const skinType = lastPartSplit[1].trim();
            const ingredient = lastPartSplit[2].trim();

            if (!type || !name || !brand || !skinType || !ingredient) {
                errorCount++;
                continue;
            }

            await pool.query(
                'INSERT INTO products (name, brand, product_type, skin_type, main_ingredient, product_url) VALUES (?, ?, ?, ?, ?, ?)',
                [name, brand, type, skinType, ingredient, link]
            );
            successCount++;
        } catch (rowError) {
            errorCount++;
        }
    }
    console.log(`\n✅ Import data dasar selesai! Berhasil: ${successCount}, Gagal: ${errorCount}`);

    console.log('\n📤 Membuat products.json untuk proses scraping...');
    const [products] = await pool.query('SELECT id, name, brand, product_type, skin_type, main_ingredient, product_url FROM products ORDER BY id ASC');
    const productsJsonPath = path.join(__dirname, 'products.json');
    fs.writeFileSync(productsJsonPath, JSON.stringify(products, null, 2), 'utf-8');
    console.log(`✅ products.json berhasil dibuat dengan ${products.length} produk.`);

    console.log('\n🤖 Menjalankan skrip Python untuk scraping gambar (proses ini akan lama)...');
    const scraperScript = path.join(__dirname, 'scrape_images.py');
    const pythonPath = process.env.NUXT_PYTHON_PATH || 'python';

    await new Promise((resolve, reject) => {
        const pythonProcess = spawn(pythonPath, ['-u', scraperScript], { stdio: 'inherit' });
        pythonProcess.on('close', code => code === 0 ? resolve() : reject(new Error(`Proses scraping gagal dengan kode ${code}`)));
        pythonProcess.on('error', err => reject(err));
    });

    console.log('\n🔄 Memperbarui database dengan URL gambar yang telah di-scrape...');
    const imagesJsonPath = path.join(__dirname, 'products_with_images.json');
    const productsWithImages = JSON.parse(fs.readFileSync(imagesJsonPath, 'utf-8'));

    let updatedCount = 0;
    for (const product of productsWithImages) {
        if (product.id && product.image_url) {
            await pool.query('UPDATE products SET image_url = ? WHERE id = ?', [product.image_url, product.id]);
            updatedCount++;
        }
    }
    console.log(`✅ ${updatedCount} produk berhasil diperbarui dengan URL gambar.`);
}

async function importFromJson(pool, jsonPath) {
    console.log('📦 Mengisi database langsung dari products_with_images.json (proses cepat)...');
    const productsToInsert = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    if (productsToInsert.length === 0) {
        throw new Error('File products_with_images.json kosong atau tidak valid.');
    }

    let successCount = 0;
    for (const product of productsToInsert) {
        await pool.query(
            'INSERT INTO products (id, name, brand, product_type, skin_type, main_ingredient, product_url, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
                product.id,
                product.name,
                product.brand,
                product.product_type,
                product.skin_type,
                product.main_ingredient,
                product.product_url,
                product.image_url
            ]
        );
        successCount++;
    }
    console.log(`✅ Berhasil mengimpor ${successCount} produk dari file JSON.`);
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

        const imagesJsonPath = path.join(__dirname, 'products_with_images.json');

        console.log('🗑️  Menghapus data lama dari tabel products...');
        await pool.query('DELETE FROM products');
        console.log('✅ Data lama berhasil dihapus.');

        if (fs.existsSync(imagesJsonPath)) {
            // Skenario cepat untuk client
            await importFromJson(pool, imagesJsonPath);
        } else {
            // Skenario lambat untuk developer (setup awal)
            console.log('🖼️ File products_with_images.json tidak ditemukan.');
            await importFromCsvAndScrape(pool);
        }

        console.log('\n✨ Proses import data selesai sepenuhnya!');

    } catch (error) {
        console.error('\n❌ Proses import gagal total:', error);
    } finally {
        if (pool) await pool.end();
        process.exit(0);
    }
}

main();