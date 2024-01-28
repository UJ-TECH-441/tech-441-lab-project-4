const express = require('express');
const handler = require('../handlers/handler-numbers');

module.exports = app => {

	// This is GET route but could conceivably be a POST.
	// It has aspects of both, as the client sends data to
	// the server but also depends on the data in the response
	app.get('/numbers/guess', async (req, res, next) => {
		try {
			// Validate input from query string; if this were
			// a POST request, min and max would be in the request
			// body and would be referenced as req.body.min / req.body.max
			if (!req.query.min || !req.query.max) {
				return res.status(400).send('min and max are required');
			}

			// Query string params are always strings, so convert to int
			const min = parseInt(req.body.min || 1);
			const max = parseInt(req.body.max || 100);
			// Call the handler
			const guess = handler.guess(min, max);
			// Return the JSON result
			res.json(guess);
		} catch (err) {
			// Error handling
			console.error(err);
			res.sendStatus(500);
		}
	});

	// POST request for user to send correct/incorrect feedback
	app.post('/numbers/vote', async (req, res, next) => {
		try {
			// As this is a POST, the data is in the body
			// read the "correct" value and pass to handler
			const result = handler.vote(req.body.correct);
			// Return the JSON result
			res.json(result);
		} catch (err) {
			// Error handling
			console.error(err);
			res.sendStatus(500);
		}
	});

};
