const mongoose = require('mongoose');

const legendSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	name: { type: String, required: true },
	code: { type: String, required: true },
	characteristics: {type: Boolean, required: true},
	lastId: { type: Number, default: 0 },
});

module.exports = mongoose.model('Legend', legendSchema);
