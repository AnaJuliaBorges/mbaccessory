const Input = require('../models/Inputs');

module.exports = {
	async validateInput(req, res, next) {
		const { name } = req.params;

		try {
			const input = await Input.find({name});
			res.input = input[0];

			if (!input) {
				return res
					.status(404)
					.json({ error: 'Insumo não encontrado' });
			}
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}

		next();
	},
};
