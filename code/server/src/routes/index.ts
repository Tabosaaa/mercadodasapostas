import { Router } from "express";
import authRoutes from "./auth";
import productRoutes from './product';
import gmailProductRouter from "./gmailAccountProduct";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/product", productRoutes);
rootRouter.use("/gmailAccountProduct", gmailProductRouter);


export default rootRouter;