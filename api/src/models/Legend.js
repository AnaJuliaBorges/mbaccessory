const mongoose = require('mongoose');

const legendSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	name: { type: String, required: true },
	code: { type: String, required: true },
	characteristics: {type: Boolean, default: false},
	lastId: { type: Number, default: 0 },
	product: {type: Boolean, default: false}
});

module.exports = mongoose.model('Legend', legendSchema);
