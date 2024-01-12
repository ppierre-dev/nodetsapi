import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthPayload } from '../dto';
import { SECRET_KEY } from '../config';
import { Request } from 'express';

export const generateSalt = async () => {
    return await bcrypt.genSalt();
}

export const hashPassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
}

export const validatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await hashPassword(enteredPassword, salt) === savedPassword;
}

export const generateSignature = (payload: AuthPayload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
}

export const validateSignature = async (req: Request) => {
    const token = req.get('Authorization')?.split(' ')[1];    
    if (token) {
        const payload = jwt.verify(token, SECRET_KEY) as AuthPayload;
        req.user = payload;

        return true;
    }

    return false;
}