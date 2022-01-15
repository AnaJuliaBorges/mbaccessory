const { validate: isUuid } = require('uuid');
const Products = require('../models/Products');

module.exports = {
	async validateId(req, res, next) {
		const { id } = req.params;

		if (!isUuid(id)) {
			return res.status(400).json({ error: 'ID inválido' });
		}

		try {
			const product = await Products.findById(id);
			res.product = product;

			if (!product) {
				return res
					.status(404)
					.json({ error: 'Produto não encontrado' });
			}
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}

		next();
	},
};
