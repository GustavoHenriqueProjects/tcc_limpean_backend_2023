"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.createJWT = void 0;
const jwt = require('jsonwebtoken');
const SECRETE = '3oFEe4PtHxJeXsa7hY8WBFtCt1AJ4GwgqF6WARF1NG0mUnc89W';
const EXPIRES = "24h";
const createJWT = (payload) => {
    const token = jwt.sign({
        name: payload.email,
        id: payload.id
    }, SECRETE, { expiresIn: EXPIRES });
    return token;
};
exports.createJWT = createJWT;
const validate = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRETE, (err, decoded) => {
            if (err) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
};
exports.validate = validate;
