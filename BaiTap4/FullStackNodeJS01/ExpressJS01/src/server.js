import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import api from './routes/api.js';
import configViewEngine from './config/viewEngine.js';
import { connectDB, sequelize } from './config/database.js';

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);
app.use('/api', api);

const start = async () => {
  await connectDB();
  await sequelize.sync(); 
  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`Backend NodeJS app listening on port ${port}`));
};
start();
