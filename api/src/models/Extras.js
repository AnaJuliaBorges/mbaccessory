const mongoose = require('mongoose');

const extrasSchema = new mongoose.Schema({
	_id: { type: String, required: true },
    proWork: { type: Number, required: true },
    priceMinute: { type: Number, required: true },
    paymentRate: {type: Number, required: true},
    profitMargin: {type: Number, required: true},
    totalInputs: {tyoe: Number, required: true}
});

module.exports = mongoose.model('Extras', extrasSchema);
