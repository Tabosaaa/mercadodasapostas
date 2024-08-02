import express from 'express';
import { PORT } from './secrets';
//import dotenv from 'dotenv';
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';
import {errorMiddleware} from './middlewares/errors';
import cors from 'cors'; 
import { createServer } from 'http';
import crypto from 'crypto';


// Carrega as variáveis de ambiente do arquivo .env para o processo
//dotenv.config();

const app = express();
const httpServer = createServer(app);

export { httpServer }

app.use(express.json())

const allowedOrigins = [
    "http://localhost:5173"
  ];
  
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  };
  
app.use(cors(corsOptions));

app.use('/api', rootRouter)

export const prismaClient = new PrismaClient({
    log:[]
    //log:['query']
})

app.use(errorMiddleware);

//const port = process.env.PORT || 3000; // Use a porta definida no ambiente ou 3000 se não estiver definida

httpServer.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
    }
);


export default app;
