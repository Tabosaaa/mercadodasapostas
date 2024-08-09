import { Router } from "express";
import Express from "express";
import cors from "cors"; // Importe o pacote cors
import { errorHandler } from "../error-handler";
import  authMiddleware  from "../middlewares/auth";
import { createGmailProduct, getManyGmail, getSpecificGmail, updateGmailProduct, deleteGmail } from "../controller/gmailAccountProduct";

const gmailProductRouter: Router = Express.Router();

// Use o middleware cors para permitir solicitações de http://localhost:5173
gmailProductRouter.use(cors({ origin: ["http://localhost:5173" ],}));

gmailProductRouter.post("/update-gmail", authMiddleware, errorHandler(updateGmailProduct));
gmailProductRouter.post("/create-gmail",authMiddleware, errorHandler(createGmailProduct));
gmailProductRouter.get("/get-specific-gmail/:id",  errorHandler(getSpecificGmail));
gmailProductRouter.get("/get-many-gmail/:id", errorHandler(getManyGmail));
gmailProductRouter.delete("/deleteGmail/:id", errorHandler(deleteGmail));


export default gmailProductRouter;
