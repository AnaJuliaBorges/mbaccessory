const express = require('express');
const { v4: uuid } = require('uuid');
const Codes = require('../models/Codes');

module.exports = {
	async getAll(req, res) {
		try {
			const codes = await Codes.find();
			return res.status(200).json({ codes });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},

	async store(req, res) {
		const {
			category,
			caracter,
			description,
			image,
			initialQuantity,
			totalPrice,
		} = req.body;

		if (!category || !description || !initialQuantity || !totalPrice) {
			return response.status(400).json({
				error: 'Categoria, Descrição, Quantidade Inicial e Preço total são obrigatórios',
			});
		}

		const fomattedCode = new Codes({
			_id: uuid(),
			category,
			description,
		});
	},
};
