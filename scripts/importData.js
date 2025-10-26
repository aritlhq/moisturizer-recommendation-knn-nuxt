const fs = require('fs');
const path = require('path');
const db = require('../config/db');

async function importData() {
  try {
    console.log('🔄 Memulai import data dari dataset.csv...\n');

    const csvPath = path.join(__dirname, '../../dataset.csv');

    if (!fs.existsSync(csvPath)) {
      console.error('❌ File dataset.csv tidak ditemukan!');
      console.error(`   Expected path: ${csvPath}`);
      process.exit(1);
    }

    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = csvContent.split('\n');

    const dataLines = lines.slice(1).filter(line => line.trim());

    console.log(`📊 Total baris data: ${dataLines.length}\n`);

    let successCount = 0;
    let errorCount = 0;

    console.log('🗑️  Menghapus data lama...');
    await db.query('DELETE FROM products');
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

            if (!type || !name || !brand || !skinType || !ingredient) {
              errorCount++;
              continue;
            }

            if (type.length > 100) {
              errorCount++;
              continue;
            }

            await db.query(
              'INSERT INTO products (name, brand, product_type, skin_type, main_ingredient, product_url, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
              [name, brand, type, skinType, ingredient, link, null]
            );

            successCount++;

            if (successCount % 100 === 0) {
              console.log(`   ✓ ${successCount} produk berhasil diimport...`);
            }
          }
        }
      } catch (rowError) {
        errorCount++;
        if (errorCount <= 5) {
          console.error(`   ⚠️  Error pada baris ${i + 2}:`, rowError.message);
        }
      }
    }

    console.log('\n✅ Import selesai!');
    console.log(`   - Berhasil: ${successCount} produk`);
    console.log(`   - Gagal: ${errorCount} baris\n`);

    console.log('📤 Membuat products.json untuk ML model...');
    const [products] = await db.query(
      'SELECT id, name, brand, product_type, skin_type, main_ingredient, product_url FROM products ORDER BY id ASC'
    );
    
    const productsJsonPath = path.join(__dirname, 'products.json');
    fs.writeFileSync(productsJsonPath, JSON.stringify(products, null, 2), 'utf-8');
    console.log(`✅ products.json berhasil dibuat (${products.length} produk)\n`);

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Import gagal:', error);
    process.exit(1);
  }
}

importData();
