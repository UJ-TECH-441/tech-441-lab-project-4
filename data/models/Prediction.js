const mongoose = require('mongoose');

const {Schema} = mongoose;

module.exports = mongoose.model('Prediction', new Schema({
	predictionDate: mongoose.Schema.Types.Date,
	predictions: mongoose.Schema.Types.Array,
	correct: mongoose.Schema.Types.Boolean
}));
