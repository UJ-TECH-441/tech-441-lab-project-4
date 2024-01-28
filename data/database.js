const mongoose = require('mongoose');
const models = require('./models');

// Connect to local MongoDB
const connect = async () => await mongoose.connect('mongodb://127.0.0.1:27017/mindreader');

// Export models to avoid excess imports
module.exports.models = models;

// Find all documents of the given model type
module.exports.findAll = async (model, criteria, sort) => {
	return await module.exports.find(model, criteria, {}, sort);
};

// Find a document by its MongoDB _id field
module.exports.findById = async (model, id, projection) => {
	const conn = await connect();
	return await model.findById(id, projection).exec();
};

// Find documents matching supplied criteria
module.exports.find = async (model, filter, fields, sort) => {
	const conn = await connect();
	return await model.find(filter, fields).sort(sort || model.defaultSort);
};

// Find the first document matching supplied criteria
module.exports.findOne = async (model, criteria, fields) => {
	const results = await module.exports.find(model, criteria, fields);
	if (!results || results.length === 0) return null;
	return results[0];
};

module.exports.aggregate = async (model, filter) => {
	const conn = await connect();
	return await model.aggregate([{ $match: filter }]);
};

module.exports.create = async (model, obj) => {
	console.log(model, obj);
	const conn = await connect();
	return await model.create(obj);
};

module.exports.update = async (model, filter, obj) => {
	const conn = await connect();
	return await model.findOneAndUpdate(filter, obj);
};

module.exports.updateById = async (model, _id, obj) => {
	const conn = await connect();
	return await model.findOneAndUpdate({ _id }, obj);
};
