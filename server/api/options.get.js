import db from '~/server/utils/db';

export default defineEventHandler(async (event) => {
    const [skinTypes] = await db.query(
        'SELECT DISTINCT skin_type FROM products ORDER BY skin_type'
    );
    const [productTypes] = await db.query(
        'SELECT DISTINCT product_type FROM products ORDER BY product_type'
    );
    const [mainIngredients] = await db.query(
        'SELECT DISTINCT main_ingredient FROM products ORDER BY main_ingredient'
    );

    return {
        skinTypes: skinTypes.map(row => row.skin_type),
        productTypes: productTypes.map(row => row.product_type),
        mainIngredients: mainIngredients.map(row => row.main_ingredient)
    };
});