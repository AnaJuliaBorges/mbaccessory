
const mongoose = require('mongoose');

const inputsSchema = new mongoose.Schema({
	_id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    initialQuantity: { type: Number, required: true },
    active: {type: Boolean, default: true},
    inventory: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    unitPrice: { type: Number, required: true}
});

module.exports = mongoose.model('Inputs', inputsSchema);
