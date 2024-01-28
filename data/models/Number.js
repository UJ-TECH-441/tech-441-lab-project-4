const mongoose = require('mongoose');

const {Schema} = mongoose;

module.exports = mongoose.model('Number', new Schema({
	min: mongoose.Schema.Types.Number,
	max: mongoose.Schema.Types.Number,
	guess: mongoose.Schema.Types.Number,
	scored: mongoose.Schema.Types.Boolean,
	correct: mongoose.Schema.Types.Boolean,
	dateGenerated: mongoose.Schema.Types.Date
}));
