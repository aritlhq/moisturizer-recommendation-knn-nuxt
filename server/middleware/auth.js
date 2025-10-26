import { verifyToken } from '~/server/utils/jwt';

export default defineEventHandler((event) => {
    const protectedRoutes = [
        '/api/products'
    ];

    const methodRequiresAuth = ['POST', 'PUT', 'DELETE'];
    const isProtected = protectedRoutes.some(route => event.path.startsWith(route));
    const requiresAuth = isProtected && methodRequiresAuth.includes(event.method);

    if (requiresAuth) {
        const authHeader = getRequestHeader(event, 'authorization');
        if (!authHeader) {
            throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
        }

        const token = authHeader.split(' ')[1];
        const user = verifyToken(token);

        if (!user) {
            throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
        }

        event.context.user = user;
    }
});