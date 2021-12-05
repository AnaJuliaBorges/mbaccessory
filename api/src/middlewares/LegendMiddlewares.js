const { validate: isUuid } = require('uuid');
const Legend = require('../models/Legend');

module.exports = {
	async validateId(req, res, next) {
		const { id } = req.params;

		if (!isUuid(id)) {
			return res.status(400).json({ error: 'ID inválido' });
		}

		try {
			const legend = await Legend.findById(id);
			res.legend = legend;

			if (!legend) {
				return res
					.status(404)
					.json({ error: 'Legenda não encontrada' });
			}
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}

		next();
	},
};
