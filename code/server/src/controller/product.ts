import { Request, Response, NextFunction } from "express";
import { prismaClient } from '../index';
import { productSchema } from "../schema/product";

export const createProduct = async (req: any, res: Response, next: NextFunction) => {
    try {

        if (!req.user.isAdm) {
            res.status(403).json({ message: "Você não tem permissão para acessar este recurso" });
            return;
        }

        productSchema.parse(req.body);

        const { name, description, price, imageUrl, quantity } = req.body;

        const product = await prismaClient.product.create({
            data: {
                name,
                description,
                price,
                imageUrl,
                quantity,
            }
        });

        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
}

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await prismaClient.product.findMany();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await prismaClient.product.findUnique({ where: { id: parseInt(id, 10) } });

        if (!product) {
            res.status(404).json({ message: "Produto não encontrado" });
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req: any, res: Response, next: NextFunction) => {
    try {
        if (!req.user.isAdm) {
            res.status(403).json({ message: "Você não tem permissão para acessar este recurso" });
            return;
        }

        productSchema.parse(req.body);

        const  id   = +req.params.id;
        const { name, description, price, imageUrl, quantity } = req.body;

        const product = await prismaClient.product.update({
            where: { id: id },
            data: {
                name,
                description,
                price,
                imageUrl,
                quantity,
            }
        });

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

export const deleteProduct = async (req: any, res: Response, next: NextFunction) => {
    try {
        if (!req.user.isAdm) {
            res.status(403).json({ message: "Você não tem permissão para acessar este recurso" });
            return;
        }

        const id  = +req.params.id;

        await prismaClient.product.delete({ where: { id: id } });

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

