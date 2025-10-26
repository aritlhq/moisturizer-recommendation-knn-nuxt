import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '~/server/utils/db';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { username, password } = body;
    const config = useRuntimeConfig(event);

    if (!username || !password) {
        throw createError({ statusCode: 400, statusMessage: 'Username and password are required' });
    }

    const [users] = await db.query(
        'SELECT * FROM users WHERE username = ?',
        [username]
    );

    if (users.length === 0) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        config.jwtSecret,
        { expiresIn: '24h' }
    );

    return {
        message: 'Login successful',
        token,
        user: {
            id: user.id,
            username: user.username,
            role: user.role
        }
    };
});