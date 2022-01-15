
const mongoose = require('mongoose');

const inputsSchema = new mongoose.Schema({
	_id: { type: String, required: true },
    name: { type: String, required: true },
    initialQuantity: { type: Number, required: true },
    inventory: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    unitPrice: { type: Number, required: true}
});

module.exports = mongoose.model('Inputs', inputsSchema);
