const { v4: uuid } = require('uuid');
const Products = require('../models/Products');
const Legend = require('../models/Legend');

module.exports = {
	async getAll(req, res) {
		try {
			const products = await Products.find();
			return res.status(200).json({ products });
		} catch (err) {
			res.status(500).json({ error: err.message });
		}
	},

	async store(req, res) {
		const {name, category, description, collectionMb, image, costPrice, initialQuantity, productionTime, materials } =
			req.body;

            console.log(req.body)
		if (!name || !image || !category || !description || !initialQuantity || !costPrice || !productionTime || !collectionMb || !materials) {
			return res.status(400).json({
				error: 'Nome, Imagem, Categoria, Descrição, Quantidade Inicial, Coleção e Preço de custo, Tempo de produção e materiais são obrigatórios',
			});
		}

		let initialCode;
		const findLegend = await Legend.find({ name: category });

		if (!findLegend.length)
			return res.status(400).json({ error: 'Categoria não encontrada' });
		
		const legendFound = findLegend[0];
		initialCode = legendFound.code;
		
		const formattedCode = initialCode + legendFound.lastId.toString().padStart(3, '0');		 

		const findCode = await Products.find({ code: formattedCode });
		if (findCode.length = 0)
			return res.status(400).json({ error: 'Código já cadastrado' });

		const item = new Products({
			_id: uuid(),
			name,
			category,
			description,
			code: formattedCode,
			image: image || null,
			initialQuantity,
			inventory: initialQuantity,
			collectionMb,
			costPrice,
			productionTime,
			salePrice: costPrice,
			materials
		});

		try {
			legendFound.lastId++;
			await item.save();
			await legendFound.save();

			return res.status(200).json({
				check: item,
				message: 'Produto cadastrado com sucesso',
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
			const codeObject = await Products.find({ code });

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
