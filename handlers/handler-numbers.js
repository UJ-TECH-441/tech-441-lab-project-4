// The faker-js module creates fake, random data
const { faker } = require('@faker-js/faker');
const database = require('../data/database');
const mongoose = require('mongoose');

// The guessNumber() function will be called by the route-numbers.js route
module.exports.guess = async (min, max) => {
	const guess = faker.number.int({ min, max });

	// Save predictions in database
	const numberObject = await database.create(database.models.Number, {
		min, max, guess, scored: false, correct: false, dateGenerated: Date.now()
	});

	return ({ id: numberObject.id, guess });
}
