const database = require('../data/database');

module.exports.rating = async star => {
	// Stars will be received as a string parameter, so convert it to a number
	star = parseInt(star);

	let rating = await database.findOne(database.models.Rating);
	if (!rating) rating = await database.create(database.models.Rating,
		{ votes: 0, stars: 0 });

	// Increment the vote total and overall total of stars
	rating.votes++;
	rating.stars += star;

	// Save changes
	await database.updateById(database.models.Rating,
		rating._id, rating);
	return { votes: rating.votes, stars: rating.stars };
}