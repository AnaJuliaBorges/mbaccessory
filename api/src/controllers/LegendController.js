const { request } = require('express');
const express = require('express');
const { v4: uuid } = require('uuid');
const { update } = require('../models/Legend');
const Legend = require('../models/Legend');

module.exports = {
	async getAll(req, res) {
		try {
			const legend = await Legend.find();
			return res.status(200).json({ legend });
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	},

	async store(req, res) {
		const { name, code } = req.body;

		if (!name || !code) {
			return res
				.status(400)
				.json({ error: 'nome e código são obrigatórios' });
		}

		const item = new Legend({
			_id: uuid(),
			name,
			code,
		});

		try {
			await item.save();
			return res
				.status(201)
				.json({ message: 'Legenda adicionada com sucesso' });
		} catch (err) {
			res.status(400).json({ error: err.message });
		}
	},

	async update(req, res) {
		const { name, code } = req.body;

		if (!name && !code)
			return res.status(400).json({ error: 'Nome ou Código requerido' });

		if (name) res.legend.name = name;
		if (code) res.legend.code = code;

		try {
			await res.legend.save();
			return res
				.status(201)
				.json({ message: 'Atualização bem sucedida' });
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	},

	async delete(req, res) {
		try {
			await res.legend.remove();
			return res
				.status(200)
				.json({ message: 'Legend removida com sucesso' });
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	},

	async updateLastId(req, res) {
		res.legend.lastId++;
		try {
			await res.legend.save();
			return res.status(200).json({
				message: `Ultimo id atualizado, novo ID: ${res.legend.lastId}`,
			});
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
	},
};
