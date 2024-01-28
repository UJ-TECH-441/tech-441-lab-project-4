const { rating } = require('../data/store');

module.exports.rating = star => {
	// Stars will be received as a string parameter, so convert it to a number
	star = parseInt(star);
	// Increment the vote total and overall total of stars
	rating.votes++;
	rating.totalStars += star;
	// Return JSON object
	return {
		votes: rating.votes, // Total # of votes
		ratingAvg: rating.totalStars / rating.votes // Average rating
	};
}