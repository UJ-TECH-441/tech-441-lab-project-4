const express = require('express');
const handler = require('../handlers/handler-rating');
const {da} = require('@faker-js/faker');

module.exports = app => {
	app.post('/rating', async (req, res, next) => {
		try {
			if (!req.body.star) return res.sendStatus(400);
			const data = handler.rating(req.body.star);
			res.json(data);
		} catch (err) {
			// Error handling
			console.error(err);
			res.sendStatus(500);
		}
	});
};
