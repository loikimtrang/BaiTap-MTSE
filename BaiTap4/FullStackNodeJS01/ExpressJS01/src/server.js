import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import user from './routes/user.js';
import product from './routes/productRoutes.js';
import category from './routes/categoryRoutes.js';

import configViewEngine from './config/viewEngine.js';
import { connectDB, sequelize } from './config/database.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);

// API ROUTES
app.use('/user', user);
app.use('/products', product);
app.use('/categories', category);

// START APP
const start = async () => {
  await connectDB();
  await sequelize.sync();
  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`Backend NodeJS app listening on port ${port}`));
};

start();
