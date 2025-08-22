import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import configViewEngine from './config/viewEngine.js';
import initWebRoutes from './route/web.js';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configViewEngine(app);
initWebRoutes(app);
connectDB();

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Backend Nodejs is running on the port: ' + port);
});
