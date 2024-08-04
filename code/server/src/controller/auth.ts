import { Request, Response, NextFunction } from "express";
import { prismaClient } from '../index';
import { hashSync, compareSync } from 'bcrypt';
import { JWT_SECRET } from "../secrets";
import * as jwt from 'jsonwebtoken';
import { BadRequestException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { loginSchema, registerSchema } from "../schema/users";

// Registrar um novo usuário
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        registerSchema.parse(req.body);

        const { email, password, name } = req.body;

        let user = await prismaClient.user.findFirst({ where: { email } });
        if (user) {
            throw new BadRequestException("Usuário já existe", ErrorCode.USER_ALREADY_EXISTS);
        }
        const hashedPassword = hashSync(password, 10);
        user = await prismaClient.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        });

        // Retornando o usuário criado
        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

// Fazer login
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Validando a requisição com Zod
        loginSchema.parse(req.body);

        const { email, password } = req.body;

        // Buscando o usuário no banco de dados
        let user = await prismaClient.user.findFirst({ where: { email } });
        if (!user || !compareSync(password, user.password)) {
            throw new BadRequestException("Usuário ou senha incorretos", ErrorCode.USER_OR_INCORRECT_PASSWORD);
        }

        // Gerando o token JWT
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

        // Retornando o usuário e o token
        res.status(200).json({ user, token });
    } catch (error) {
        next(error); // Passando o erro para o middleware de erro
    }
}

// Obter usuário atual (rota protegida)
export const getCurrentUser = async (req: any, res: Response) => {
    res.status(200).json(req.user);
}
