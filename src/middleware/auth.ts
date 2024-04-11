import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const validarToken = (request: Request, response: Response, next: NextFunction) => {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
        return response.status(401).send({
            error: 'Token não fornecido'
        });
    }

    try {
        const chaveJWT = process.env.JWT_SECRET || 'secret2001';
        const decoded = jwt.verify(token, chaveJWT);
        next();
    } catch (error) {
        return response.status(403).send({
            error: 'Token inválido'
        });
    }
};
