import db from '~/server/utils/db';

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');

    if (event.method === 'GET') {
        const [products] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
        if (products.length === 0) {
            throw createError({ statusCode: 404, statusMessage: 'Product not found' });
        }
        return products[0];
    }

    if (event.method === 'PUT') {
        const body = await readBody(event);
        const { name, brand, product_type, skin_type, main_ingredient, product_url, image_url } = body;

        if (!name || !brand || !product_type || !skin_type || !main_ingredient) {
            throw createError({ statusCode: 400, statusMessage: 'Required fields are missing' });
        }

        const [result] = await db.query(
            'UPDATE products SET name = ?, brand = ?, product_type = ?, skin_type = ?, main_ingredient = ?, product_url = ?, image_url = ? WHERE id = ?',
            [name, brand, product_type, skin_type, main_ingredient, product_url || null, image_url || null, id]
        );

        if (result.affectedRows === 0) {
            throw createError({ statusCode: 404, statusMessage: 'Product not found' });
        }

        return { message: 'Product updated successfully' };
    }

    if (event.method === 'DELETE') {
        const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            throw createError({ statusCode: 404, statusMessage: 'Product not found' });
        }

        return { message: 'Product deleted successfully' };
    }
});