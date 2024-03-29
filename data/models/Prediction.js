const mongoose = require('mongoose');

const {Schema} = mongoose;

module.exports = mongoose.model('Prediction', new Schema({
	items: mongoose.Schema.Types.Array,
	scored: mongoose.Schema.Types.Boolean,
	correct: mongoose.Schema.Types.Boolean,
	dateGenerated: mongoose.Schema.Types.Date
}));
