const { v4: uuid } = require('uuid');
const Codes = require('../models/Codes');
const Legend = require('../models/Legend');

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
		const { category, description, image, initialQuantity, totalPrice, characteristics, placePurchase, oldCode, box} =
			req.body;

		console.log('req', req.body);
		if (!category || !description || !initialQuantity || !totalPrice || !box) {
			return res.status(400).json({
				error: 'Categoria, Descrição, Quantidade Inicial e Preço total são obrigatórios',
			});
		}

		let initialCode;
		const findLegend = await Legend.find({ name: category });

		if (!findLegend.length)
			return res.status(400).json({ error: 'Categoria não encontrada' });
		
		const legendFound = findLegend[0];
		initialCode = legendFound.code;
		
		if(characteristics && characteristics != 'Nenhuma característica') {
			
			const findCharacteristics = await Legend.find({ name: characteristics });
			if (!findCharacteristics.length)
				return res.status(400).json({ error: 'Característica não encontrada' });
			
			var characteristicsFound = findCharacteristics[0];
			initialCode += findCharacteristics[0].code;
		}
		
		const findCodes = await Codes.find({code: {$regex: `^${initialCode}`}});
		const formattedCode = findCodes.length > 0 ? initialCode + findLastId(findCodes).toString().padStart(3, '0') : 
								initialCode + '001';		 

		const findCode = await Codes.find({ code: formattedCode });
		if (findCode.length = 0)
			return res.status(400).json({ error: 'Código já cadastrado' });

		const item = new Codes({
			_id: uuid(),
			category,
			description,
			placePurchase,
			code: formattedCode,
			image: image || null,
			initialQuantity,
			inventory: initialQuantity,
			totalPrice,
			unitPrice: totalPrice / initialQuantity,
			oldCode,
			box,
		});

		try {
			legendFound.lastId++;
			await item.save();
			await legendFound.save();
			
			if (characteristics) {	
				characteristicsFound.lastId++;
				await characteristicsFound.save();
			}

			return res.status(200).json({
				check: item,
				message: 'Código cadastrado com sucesso',
			});
			
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	},
	async update(req, res) {
		const { description, image } = req.body;

		if (!description && !image)
			return res
				.status(400)
				.json({ error: 'Descrição ou imagem necessárias' });

		if (description) res.code.description = description;
		if (image) res.code.image = image;

		try {
			await res.code.save();
			return res
				.status(201)
				.json({ message: 'Atualização bem sucedida' });
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	},

	async delete(req, res) {
		try {
			await res.code.remove();
			return res
				.status(200)
				.json({ message: 'codígo removido com sucesso' });
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	},

	async updateStock(req, res) {
		const { quantity = 1 } = req.body;

		res.code.inventory -= quantity;
		try {
			await res.code.save();
			return res.status(200).json({
				stock: res.code.inventory,
				message: `Estoque atualizado`,
			});
		} catch (err) {
			return res.status(400).json({ error: err.message });
		}
	},

	async getCode(req, res) {
		const { code } = req.params;
		try {
			const codeObject = await Codes.find({ code });

			if (!codeObject.length)
				return res
					.status(400)
					.json({ message: 'Código não encontrado' });

			return res.status(200).json({ code: codeObject });

		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	},
};


const findLastId = (findCodes) => {
	const findLast = findCodes[findCodes.length-1].code;
	const lastId = findLast.slice(findLast.length - 3);
	return parseInt(lastId, 10) + 1 || 0;
}
