// The faker-js module creates fake, random data
const { faker } = require('@faker-js/faker');
const database = require('../data/database');

// The read() function will be called by the index.js route
module.exports.makePredictions = async () => {
	// Create some horribly wrong predictions
	const items = [
		{
			prefix: 'Your name is',
			value: faker.person.fullName(),
		},
		{
			prefix: 'You live in',
			value: `${faker.location.city()}, ${faker.location.state({abbreviated: true})}`,
		},
		{
			prefix: 'You work for',
			value: faker.company.name()
		}
	];

	// Save predictions in database
	const predictions = await database.create(database.models.Prediction, {
		items,
		dateGenerated: Date.now(),
		scored: false,
		correct: false
	});

	return predictions;
};
