import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

configViewEngine(app);
initWebRoutes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Backend Nodejs is running on the port: ${PORT}`);
});
