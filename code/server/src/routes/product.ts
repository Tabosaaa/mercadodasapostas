import { Router } from "express";
import Express from "express";
import cors from "cors"; // Importe o pacote cors
import { errorHandler } from "../error-handler";
import  authMiddleware  from "../middlewares/auth";
import { createProduct, getProducts, getProductById, deleteProduct, updateProduct } from "../controller/product";

const productRoutes: Router = Express.Router();

// Use o middleware cors para permitir solicitações de http://localhost:5173
productRoutes.use(cors({ origin: ["http://localhost:5173" ],}));

productRoutes.post("/create-product", authMiddleware, errorHandler(createProduct));
productRoutes.get("/get-products", errorHandler(getProducts));
productRoutes.get("/get-product-by-id/:id", errorHandler(getProductById));
productRoutes.delete("/delete-product/:id", authMiddleware, errorHandler(deleteProduct));
productRoutes.put("/update-product/:id", authMiddleware, errorHandler(updateProduct));



export default productRoutes;
