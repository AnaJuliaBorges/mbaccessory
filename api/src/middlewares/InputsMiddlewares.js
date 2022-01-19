const { validate: isUuid } = require('uuid');
const Input = require('../models/Inputs');

module.exports = {
	async validateId(req, res, next) {
		const { id } = req.params;

		if (!isUuid(id)) {
			return res.status(400).json({ error: 'ID inválido' });
		}

		try {
			const input = await Input.findById(id);
			res.input = input;

			if (!input.name) {
				return res.status(404).json({ error: 'Extra não encontrado' });
			}
			
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}

		next();
	},

	async validateInput(req, res, next) {
		const { name } = req.params;

		try {
			const input = await Input.find({name});
			res.input = input[0];

			if (!input) {
				return res
					.status(404)
					.json({ error: 'Extra não encontrado' });
			}
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}

		next();
	},
};
