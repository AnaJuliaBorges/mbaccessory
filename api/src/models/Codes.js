const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	category: { type: String, required: true },
	description: { type: String, required: true },
	code: { type: String, required: true },
	image: { type: String, required: false },
	initialQuantity: { type: Number, required: true },
	inventory: { type: Number, required: true },
	totalPrice: { type: Number, required: true },
	unitPrice: { type: Number, required: true },
});

module.exports = mongoose.model('Codes', codeSchema);
