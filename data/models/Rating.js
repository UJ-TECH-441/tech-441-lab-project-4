const mongoose = require('mongoose');

const {Schema} = mongoose;

module.exports = mongoose.model('Rating', new Schema({
	votes: mongoose.Schema.Types.Number,
	stars: mongoose.Schema.Types.Number
}));
