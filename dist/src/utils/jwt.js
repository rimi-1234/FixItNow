import jwt from 'jsonwebtoken';
export const generateToken = (payload, secret, expiresIn) => {
    return jwt.sign(payload, secret, { expiresIn: expiresIn });
};
export const verifyToken = (token, secret) => {
    return jwt.verify(token, secret);
};
//# sourceMappingURL=jwt.js.map