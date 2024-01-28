// The faker-js module creates fake, random data
const { faker } = require('@faker-js/faker');
const store = require('../data/store');

// The guessNumber() function will be called by the route-numbers.js route
module.exports.guess = (min, max) => {
	const guess = faker.number.int({ min, max });
	return ({ guess });
}

module.exports.vote = correct => {
	store.numbers.votes++;
	if (correct) store.numbers.correct++;
	return ({ votes: store.numbers.votes, correct: store.numbers.correct });
}