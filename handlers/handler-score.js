const database = require('../data/database');

module.exports.score = async (category, id, isCorrect) => {
	const obj = await database.findById(database.models[category], id);
	if (!obj) throw new Error(`${category} object with ID ${id} not found`);
	obj.scored = true;
	obj.correct = isCorrect;
	await database.updateById(database.models[category], id, obj);
	const result = await database.aggregate(database.models[category], [
		{
			$match: { scored: true }
		},
		{
			$group: {
				_id: '$correct',
				count: {
					$sum: 1
				}
			}
		}
	]);
	let votes = 0;
	let correct = 0;
	result.forEach(result => {
		votes += result.count;
		if (result._id) correct = result.count;
	});
	return { votes, correct  };
};
