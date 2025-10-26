import jwt from 'jsonwebtoken';

const config = useRuntimeConfig();

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, config.jwtSecret);
    } catch (error) {
        return null;
    }
};