import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/root";

export const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.statusCode || 500; // Definindo o status code padrão como 500 (Internal Server Error)
    res.status(statusCode).json({
        message: error.message || 'Internal Server Error',
        errorCode: error.errorCode || 'INTERNAL_SERVER_ERROR',
        errors: error.errors || []
    });
}
