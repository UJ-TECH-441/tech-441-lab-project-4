const mongoose = require('mongoose');

const {Schema} = mongoose;

module.exports = mongoose.model('Rating', new Schema({
	ratingDate: mongoose.Schema.Types.Date,
	stars: mongoose.Schema.Types.Number
}));
