import express from 'express';
import * as homeController from '../controllers/homeController';

const router = express.Router();

router.get('/', homeController.getHomePage);
router.post('/post-crud', homeController.postCRUD);
router.get('/get-crud', homeController.getCRUD);
router.get('/edit-crud', homeController.getEditCRUD);
router.post('/put-crud', homeController.putCRUD);
router.get('/delete-crud', homeController.deleteCRUD);

export default (app: express.Application) => {
  app.use('/', router);
};
