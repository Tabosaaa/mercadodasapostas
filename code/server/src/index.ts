import express from 'express';
import { PORT } from './secrets';
//import dotenv from 'dotenv';
import rootRouter from './routes';
import { PrismaClient } from '@prisma/client';
import {errorMiddleware} from './middlewares/errors';
import cors from 'cors'; 
import { createServer } from 'http';

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


httpServer.listen(PORT, () => {
    console.log('Server is running on http://localhost:' + PORT);
    }
);


export default app;
