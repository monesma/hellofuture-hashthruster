import express, { Request, Response } from 'express';
import http from 'http';
export const app = express();
const PORT = process.env.PORT;
import cors from 'cors';
import morgan from 'morgan';
import { router } from './routes/router';
import MongoConnect from '../database/mongo';

export const server = http.createServer(app);
export default {
  start: (port: string | number) => {
    app.use(cors());
    //Middlewares
    app.use(express.json());
    app.use(
      express.urlencoded({
        extended: true,
      }),
    );
    app.use(morgan('combined'));

    app.use('/api/v1', router);

    app.get('/', (req: Request, res: Response) => {
      res.json({ status: 200, msg: 'Welcome to HashThruster API' });
    });

    server.listen(port, async () => {
      console.log(`The server is listening on port ${PORT}`);
      await MongoConnect.connect();
    });
  },
  end: () => {
    server.close();
  },
};
