import { spawn } from 'child_process';
import path from 'path';
import db from '~/server/utils/db';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { skin_type, product_type, main_ingredient } = body;
    const config = useRuntimeConfig(event);

    if (!skin_type || !product_type || !main_ingredient) {
        throw createError({ statusCode: 400, statusMessage: 'All fields are required' });
    }

    return new Promise((resolve, reject) => {
        const pythonScript = path.join(process.cwd(), 'scripts/predict.py');
        const pythonPath = config.pythonPath || 'python';

        const pythonProcess = spawn(pythonPath, [
            pythonScript,
            skin_type,
            product_type,
            main_ingredient
        ]);

        let pythonOutput = '';
        let pythonError = '';

        pythonProcess.stdout.on('data', (data) => {
            pythonOutput += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            pythonError += data.toString();
        });

        pythonProcess.on('close', async (code) => {
            if (code !== 0) {
                console.error('Python Error:', pythonError);
                return reject(createError({ statusCode: 500, statusMessage: 'Failed to run KNN model' }));
            }

            try {
                const productIds = JSON.parse(pythonOutput.trim());
                if (!Array.isArray(productIds) || productIds.length === 0) {
                    return resolve({ recommendations: [] });
                }

                const placeholders = productIds.map(() => '?').join(',');
                const [products] = await db.query(
                    `SELECT * FROM products WHERE id IN (${placeholders})`,
                    productIds
                );

                const sortedProducts = productIds.map(id =>
                    products.find(p => p.id === id)
                ).filter(p => p !== undefined);

                resolve({
                    message: 'Recommendations generated successfully',
                    input: { skin_type, product_type, main_ingredient },
                    recommendations: sortedProducts
                });

            } catch (parseError) {
                console.error('JSON Parse Error:', parseError);
                return reject(createError({ statusCode: 500, statusMessage: 'Failed to process recommendations' }));
            }
        });
    });
});