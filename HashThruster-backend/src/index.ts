import dotenv from 'dotenv';
dotenv.config();

import app from './frameworks/express/app';

if (process.env.PORT) {
  app.start(process.env.PORT);
} else {
  throw new Error('No port environment !');
}
