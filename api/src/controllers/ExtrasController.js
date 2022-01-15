const { v4: uuid } = require('uuid');
const Extra = require('../models/Extras');

module.exports = {
	async getAll(req, res) {
		try {
			const extra = await Extra.find();
			return res.status(200).json({ extra });
		} catch (err) {
			return res.status(500).send({ error: err.message });
		}
	},

	async store(req, res) {
		const { name, initialQuantity, totalPrice } = req.body;

		if (!name || !initialQuantity || !totalPrice) {
			return res
				.status(400)
				.json({ error: 'nome, quantidade e preço total são obrigatórios' });
		}

		const findExtra = await Extra.find({ name });

		if (findExtra.length)
			return res.status(400).json({ error: 'Nome já cadastrado' });

		const item = new Extra({
			_id: uuid(),
			name,
			initialQuantity,
			inventory: initialQuantity,
			totalPrice,
			unitPrice: totalPrice / initialQuantity
		});

		try {
			await item.save();
			return res
				.status(201)
				.json({ message: 'Gasto adicionado com sucesso' });
		} catch (err) {
			res.status(400).json({ error: err.message });
		}
	},

	async update(req, res) {
		const { name } = req.params;
		const { initialQuantity, totalPrice } = req.body;

		if (!name && (!initialQuantity || !totalPrice) )
			return res.status(400).json({ error: 'Nome e Quantidade ou Preço requerido' });

		if (initialQuantity) res.Extra.initialQuantity += initialQuantity;
		if (totalPrice) res.Extra.totalPrice = (res.Extra.totalPrice + totalPrice)/2;

		try {
			await res.Extra.save();
			return res
				.status(201)
				.json({ message: 'Atualização bem sucedida' });
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	},

	async delete(req, res) {
		try {
			await res.Extra.remove();
			return res
				.status(200)
				.json({ message: 'Insumo removido com sucesso' });
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	},

	async getExtra(req, res) {
		const { name } = req.params;
		try {
			const Extra = await Extra.find({ name });

			if (!Extra.length)
				return res
					.status(400)
					.json({ message: 'Insumo não encontrado' });

			return res.status(200).json({ input });
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	},
};
