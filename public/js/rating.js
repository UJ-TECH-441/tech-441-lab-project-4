let star = 0;

// The ready() event is fired when the DOM is fully loaded
$(document).ready(function() {
	$('.star').on('mouseover', event => starHover(parseInt(event.target.id)));
	$('.star').on('mouseout', event => starClear());
	$('.star').on('click', event => starClick(parseInt(event.target.id)));
});

// Handler for star mouseover event
const starHover = number => {
	for (let i = 1; i <= 5; i++) {
		$('#' + i).attr('src', `img/star-${number >= i ? 'on' : 'off'}.png`);
	}
};

// Handler for star mouseout event
const starClear = number => {
	if (!star) {
		$('.star').attr('src', `img/star-off.png`);
	} else {
		starHover(star);
	}
};

// Handler for star click event
const starClick = number => {
	star = number;
	$('#rating-message').hide();

	fetch('/rating', {
		method: 'POST',
		body: JSON.stringify({ star }),
		headers: { 'Content-Type': 'application/json' }
	})
	.then(resp => {
		if (!resp.ok) throw new Error(resp.statusText);
		return resp.json();
	})
	.then(data => {
		if (!data) throw new Error('Unexpected response');
		// Result will be a JSON object
		$('#votes').text(data.votes);
		$('#ratingAvg').text((data.stars / data.votes).toFixed(2));
		$('#rating-message').show();
	})
	.catch(err => {
		console.error(err);
		$('#error').html('Error');
		$('#error').show();
	});
};
