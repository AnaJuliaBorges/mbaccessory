const { validate: isUuid } = require('uuid');
const Codes = require('../models/Codes');

module.exports = {
	async validateId(req, res, next) {
		const { id } = req.params;

		if (!isUuid(id)) {
			return res.status(400).json({ error: 'ID inválido' });
		}

		try {
			const code = await Codes.findById(id);
			res.code = code;

			if (!code) {
				return res.status(404).json({ error: 'Codígo não encontrado' });
			}
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}

		next();
	},

	async validateCode(req, res, next) {
		const { code } = req.params;

		if (!code) {
			return res.status(400).json({ error: 'Código necessário' });
		}

		try {
			const codeFind = await Codes.find({ code });
			res.code = codeFind[0];

			if (!codeFind) {
				return res.status(404).json({ error: 'Codígo não encontrado' });
			}
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}

		next();
	},
};
