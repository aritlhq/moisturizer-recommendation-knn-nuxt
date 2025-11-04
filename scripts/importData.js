import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// async function runPythonScraper() {
//     console.log('\n🤖 Menjalankan skrip Python untuk scraping gambar...');
//     const pythonPath = process.env.NUXT_PYTHON_PATH || 'python';
//     const scraperScript = path.join(__dirname, 'scrape_images.py');
//
//     try {
//         const { stdout, stderr } = await execPromise(`"${pythonPath}" "${scraperScript}"`);
//         if (stderr) {
//             console.error('⚠️  Peringatan dari skrip Python:', stderr);
//         }
//         console.log(stdout);
//         console.log('✅ Skrip Python scraping gambar selesai.');
//         return true;
//     } catch (error) {
//         console.error('❌ Gagal menjalankan skrip Python:', error);
//         return false;
//     }
// }

async function runPythonScraper() {
    console.log('\n🤖 Menjalankan skrip Python untuk scraping gambar...');
    const pythonPath = process.env.NUXT_PYTHON_PATH || 'python';
    const scraperScript = path.join(__dirname, 'scrape_images.py');

    try {
        // TAMBAHKAN "-u" DI SINI
        const { stdout, stderr } = await execPromise(`"${pythonPath}" -u "${scraperScript}"`);
        if (stderr) {
            console.error('⚠️  Peringatan dari skrip Python:', stderr);
        }
        console.log(stdout);
        console.log('✅ Skrip Python scraping gambar selesai.');
        return true;
    } catch (error) {
        console.error('❌ Gagal menjalankan skrip Python:', error);
        return false;
    }
}

async function updateDatabaseWithImages(pool) {
    console.log('\n🔄 Memperbarui database dengan URL gambar...');
    const imagesJsonPath = path.join(__dirname, 'products_with_images.json');

    if (!fs.existsSync(imagesJsonPath)) {
        console.error('❌ File products_with_images.json tidak ditemukan. Scraping mungkin gagal.');
        return;
    }

    const productsWithImages = JSON.parse(fs.readFileSync(imagesJsonPath, 'utf-8'));

    let updatedCount = 0;
    for (const product of productsWithImages) {
        if (product.id && product.image_url) {
            try {
                await pool.query(
                    'UPDATE products SET image_url = ? WHERE id = ?',
                    [product.image_url, product.id]
                );
                updatedCount++;
            } catch (error) {
                console.error(`Gagal update produk ID ${product.id}:`, error);
            }
        }
    }
    console.log(`✅ ${updatedCount} dari ${productsWithImages.length} produk berhasil diperbarui dengan URL gambar.`);
}

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

        console.log('\n✅ Import data dasar selesai!');
        console.log(`   - Berhasil: ${successCount} produk`);
        console.log(`   - Gagal: ${errorCount} baris\n`);

        console.log('📤 Membuat products.json untuk ML model...');
        const [products] = await pool.query(
            'SELECT id, name, brand, product_type, skin_type, main_ingredient, product_url FROM products ORDER BY id ASC'
        );

        const productsJsonPath = path.join(__dirname, 'products.json');
        fs.writeFileSync(productsJsonPath, JSON.stringify(products, null, 2), 'utf-8');
        console.log(`✅ products.json berhasil dibuat (${products.length} produk)\n`);

        // --- TAHAP BARU: SCRAPING DAN UPDATE ---
        const scraperSuccess = await runPythonScraper();
        if (scraperSuccess) {
            await updateDatabaseWithImages(pool);
        }

    } catch (error) {
        console.error('\n❌ Proses import/scraping gagal total:', error);
    } finally {
        if (pool) await pool.end();
        process.exit(0);
    }
}

importData();