import db from '~/server/utils/db';

export default defineEventHandler(async (event) => {
    const queryParams = getQuery(event);
    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;
    const search = queryParams.search || '';
    const offset = (page - 1) * limit;

    let query = 'SELECT * FROM products';
    let countQuery = 'SELECT COUNT(*) as total FROM products';
    const queryValues = [];
    const countValues = [];

    if (search) {
        const searchCondition = ' WHERE name LIKE ? OR brand LIKE ? OR main_ingredient LIKE ?';
        const searchValue = `%${search}%`;
        query += searchCondition;
        countQuery += searchCondition;
        queryValues.push(searchValue, searchValue, searchValue);
        countValues.push(searchValue, searchValue, searchValue);
    }

    query += ' ORDER BY id DESC LIMIT ? OFFSET ?';
    queryValues.push(limit, offset);

    const [products] = await db.query(query, queryValues);
    const [countResult] = await db.query(countQuery, countValues);
    const total = countResult[0].total;

    return {
        products,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
});