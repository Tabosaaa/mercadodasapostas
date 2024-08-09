import { Request, Response, NextFunction } from "express";
import { prismaClient } from '../index';
import { gmailProductSchema } from "../schema/gmailAccountProduct";

export const updateGmailProduct = async (req: any, res: Response, next: NextFunction) => {
    try {
        if (!req.user.isAdm) {
            res.status(403).json({ message: "Você não tem permissão para acessar este recurso" });
            return;
        }

        gmailProductSchema.parse(req.body);

        const  id   = +req.params.id;
        const { email,password, subEmail } = req.body;

        const product = await prismaClient.gmailAccountProduct.update({
            where: { id: id },
            data: {
               email,
               password,
               subEmail,
            }
        });

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}


export const createGmailProduct = async (req: any, res: Response, next: NextFunction) => {
    try {
        // Verificação de permissões
        if (!req.user.isAdm) {
            return res.status(403).json({ message: "Você não tem permissão para acessar este recurso" });
        }

        // Validação do corpo da requisição
        gmailProductSchema.parse(req.body);

        const { email, password, subEmail, productId } = req.body;

        // Criação do produto no banco de dados
        const product = await prismaClient.gmailAccountProduct.create({
            data: {
               email,
               password,
               subEmail,
               needSubEmail: false,
               wasUsed: false,
               product: {
                     connect: {
                          id: productId
                     }
                }
            }
        });

        // Retorno do produto criado com status 201
        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
}


export const getSpecificGmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const  id  = +req.params.id;
        const product = await prismaClient.gmailAccountProduct.findUnique({ where: { id: id } });

        if (!product) {
            res.status(404).json({ message: "Produto não encontrado" });
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}


export const getManyGmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const quantity = parseInt(req.params.quantity, 10);
        
        if (isNaN(quantity) || quantity <= 0) {
            return res.status(400).json({ message: 'Invalid quantity parameter' });
        }

        const products = await prismaClient.gmailAccountProduct.findMany({
            take: quantity,
            where: {
                wasUsed: false
            }
        });

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const deleteGmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        
        // Check if user exists before attempting to delete
        const product = await prismaClient.gmailAccountProduct.findUnique({ where: { id: +id } });
        if (!product) {
            return res.status(404).json({ message: "User not found" });
        }

        await prismaClient.gmailAccountProduct.delete({ where: { id: +id } });
    } catch (error) {
        next(error);
    }
}