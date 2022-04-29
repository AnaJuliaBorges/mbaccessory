const mongoose = require('mongoose');
const Materials = require('./Materials');

const productSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	name: { type: String, required: true },
	code: { type: String, required: true },
	category: { type: String, required: false },
	description: { type: String, required: true },
	collectionMb: { type: String, required: true },
	image: { type: String, required: false },
	costPrice: { type: Number, required: true },
	initialQuantity: { type: Number, required: true },
	inventory: { type: Number, required: true },
	productionTime: { type: Number, required: true },
	salePrice: { type: Number, required: true },
	materials: { type: Array, items: [Materials], required: true },
});

module.exports = mongoose.model('Product', productSchema);
