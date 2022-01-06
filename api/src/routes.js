const express = require('express');
const routes = express.Router();

const CodeController = require('./controllers/CodeController');
const LegendController = require('./controllers/LegendController');
const LegendMiddleware = require('./middlewares/LegendMiddlewares');
const CodesMiddleware = require('./middlewares/CodesMiddleware');

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
