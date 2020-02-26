import { Router } from 'express';
import multer from 'multer';

import FileController from './app/controllers/FileController';
import FileSurveyController from './app/controllers/FileSurveyController';
import PackageController from './app/controllers/PackageController';
import PriceController from './app/controllers/PriceController';
import ProductsController from './app/controllers/ProductsController';
import QrcodeController from './app/controllers/QrcodeController';
import SessionController from './app/controllers/SessionController';
import SurveyController from './app/controllers/SurveyController';
import CartController from './app/controllers/user/CartContorller';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.get('/products', ProductsController.index);
routes.put('/products/:id', ProductsController.find);
routes.get('/packages', PackageController.index);

routes.use(authMiddleware);

/*
 ** Users
 */
routes.get('/users', UserController.index);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);
routes.post('/usersfind', UserController.find);

/*
 ** Files
 */
routes.post('/files', upload.single('file'), FileController.store);

/*
 ** Surveys
 */
routes.post('/surveys', SurveyController.store);
routes.get('/surveys', SurveyController.index);
routes.put('/surveys/:id', SurveyController.update);
routes.delete('/surveys/:id', SurveyController.delete);

/*
 ** FilesSurveys
 */
routes.post('/filesurvey', upload.single('file'), FileSurveyController.store);

/*
 ** Qrcode
 */
routes.post('/qrcode', upload.single('file'), QrcodeController.store);

/*
 ** Packages
 */
routes.post('/packages', PackageController.store);
routes.put('/packages/:id', PackageController.update);
routes.delete('/packages/:id', PackageController.delete);

/*
 ** Prices
 */
routes.get('/prices', PriceController.index);
routes.put('/prices', PriceController.update);

/*
 ** Carts
 */
routes.post('/carts', CartController.store);
routes.get('/carts', CartController.index);
routes.put('/carts/:id', CartController.update);

export default routes;
