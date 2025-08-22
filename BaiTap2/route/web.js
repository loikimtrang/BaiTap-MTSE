import express from 'express';
import homeController from '../controller/homeController.js';

let router = express.Router();

const initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);

  router.get('/crud', homeController.getCRUD);
  router.post('/post-crud', homeController.postCRUD);
  router.get('/get-crud', homeController.getAllCRUD);
  router.get('/edit-crud', homeController.getEditCRUD);
  router.post('/put-crud', homeController.putCRUD);
  router.get('/delete-crud', homeController.deleteCRUD);

  return app.use('/', router);
};

export default initWebRoutes;
