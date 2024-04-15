import express from 'express';
import { router } from './routes/routes';
import cors from 'cors';
import cookieParser from 'cookie-parser';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', router)


function startServer() {
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
  })
}

startServer();