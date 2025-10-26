import db from '~/server/utils/db';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { name, brand, product_type, skin_type, main_ingredient, product_url, image_url } = body;

    if (!name || !brand || !product_type || !skin_type || !main_ingredient) {
        throw createError({ statusCode: 400, statusMessage: 'Required fields are missing' });
    }

    const [result] = await db.query(
        'INSERT INTO products (name, brand, product_type, skin_type, main_ingredient, product_url, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, brand, product_type, skin_type, main_ingredient, product_url || null, image_url || null]
    );

    return {
        message: 'Product created successfully',
        productId: result.insertId
    };
});