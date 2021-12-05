const express = require('express');
const routes = express.Router();

const CodeController = require('./controllers/CodeController');
const LegendController = require('./controllers/LegendController');
const LegendMiddleware = require('./middlewares/LegendMiddlewares');

routes.get('/', (request, response) => response.send('Hello World'));
routes.get('/codes', CodeController.getAll);

//Legend
routes.get('/legend', LegendController.getAll);
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

module.exports = routes;
