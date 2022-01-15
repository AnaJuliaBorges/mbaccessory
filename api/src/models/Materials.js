const mongoose = require('mongoose');

const materialsSchema = new mongoose.Schema({
	code: { type: String, required: true },
	quantity: { type: Number, required: true },
	totalPrice: { type: Number, required: false }
});

module.exports = mongoose.model('Materials', materialsSchema);
