const express = require('express');
const handler = require('../handlers/handler-mindreader');

module.exports = app => {

	app.get('/predictions', async (req, res, next) => {
		try {
			const messages = await handler.makePredictions();
			res.json({ messages });
		} catch (err) {
			// Error handling
			console.error(err);
			res.sendStatus(500);
		}
	});

};
