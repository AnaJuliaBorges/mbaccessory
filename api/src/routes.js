const express = require('express');
const routes = express.Router();

const CodeController = require('./controllers/CodeController');
const LegendController = require('./controllers/LegendController');
const LegendMiddleware = require('./middlewares/LegendMiddlewares');
const CodesMiddleware = require('./middlewares/CodesMiddleware');
const InputsController = require('./controllers/InputsController');
const InputsMiddlewares = require('./middlewares/InputsMiddlewares');
const ProductController = require('./controllers/ProductController');

//Codes
routes.get('/codes', CodeController.getAll);
routes.get('/codes/:code', CodeController.getCode);
routes.post('/codes', CodeController.store);
routes.put('/codes/:id', CodesMiddleware.validateId, CodeController.update);
routes.delete('/codes/:id', CodesMiddleware.validateId, CodeController.delete);
routes.patch(
	'/codes/:code',
	CodesMiddleware.validateCode,
	CodeController.updateStock
);

//Products
routes.get('/products', ProductController.getAll);
//routes.get('/products/:code', ProductController.getCode);
routes.post('/products', ProductController.store);
//routes.put('/products/:id', ProductsMiddleware.validateId, CodeController.update);
//routes.delete('/products/:id', ProductsMiddleware.validateId, CodeController.delete);
// routes.patch(
// 	'/products/:code',
// 	ProductsMiddleware.validateCode,
// 	CodeController.updateStock
//);

//Inputs
routes.get('/inputs', InputsController.getAll);
routes.get('/inputs/:name', InputsController.getInput);
routes.post('/inputs', InputsController.store);
routes.put('/inputs/:name', InputsMiddlewares.validateInput, InputsController.update);
routes.patch('/inputs/active/:name', InputsMiddlewares.validateInput, InputsController.updateActive);
routes.patch('/inputs/inventory/:name', InputsMiddlewares.validateInput, InputsController.updateInventory);
routes.delete('/inputs/:id', InputsMiddlewares.validateId, InputsController.delete);

//Legend
routes.get('/legend', LegendController.getAll);
routes.get('/legend/:name', LegendController.getLegend);
routes.post('/legend', LegendController.store);
routes.put('/legend/:id', LegendMiddleware.validateId, LegendController.update);
routes.delete(
	'/legend/:id',
	LegendMiddleware.validateId,
	LegendController.delete
);
routes.patch(
	'/legend/:id',
	LegendMiddleware.validateId,
	LegendController.updateLastId
);
routes.patch(
	'/legend/zerar/:id',
	LegendMiddleware.validateId,
	LegendController.zerarID
);

module.exports = routes;
