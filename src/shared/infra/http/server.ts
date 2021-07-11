import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Response, Request } from 'express';
import 'express-async-errors';

import '@shared/container';
import '@shared/infra/typeorm';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(express.json());
app.use(rateLimiter);
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.error(err);

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server Error' });
});

app.listen(3333, () => {
  console.log('🚀 Server started on Port 3333');
});
