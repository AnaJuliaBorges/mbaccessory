const { v4: uuid } = require('uuid');
const Input = require('../models/Inputs');

module.exports = {
	async getAll(req, res) {
		try {
			const input = await Input.find();
			return res.status(200).json({ input });
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

		const findInput = await Input.find({ name });

		if (findInput.length)
			return res.status(400).json({ error: 'Nome já cadastrado' });

		const item = new Input({
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

		if (initialQuantity) res.input.initialQuantity += initialQuantity;
		if (totalPrice) res.input.totalPrice = (res.input.totalPrice + totalPrice)/2;

		try {
			await res.input.save();
			return res
				.status(201)
				.json({ message: 'Atualização bem sucedida' });
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	},

	async delete(req, res) {
		try {
			await res.input.remove();
			return res
				.status(200)
				.json({ message: 'Insumo removido com sucesso' });
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	},

	async getInput(req, res) {
		const { name } = req.params;
		try {
			const input = await Input.find({ name });

			if (!input.length)
				return res
					.status(400)
					.json({ message: 'Insumo não encontrado' });

			return res.status(200).json({ input });
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	},
};
