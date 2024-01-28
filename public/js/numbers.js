$(document).ready(function() {
	for (let i = 1; i <= 100; i++) {
		$('#min').append(`<option value=${i}>${i}</option>`);
		$('#max').append(`<option value=${Math.abs(i - 101)}>${Math.abs(i - 101)}</option>`);
	}
	$('#submit').on('click', () => guess());
});

const guess = () => {
	// Read min/max values
	const min = $('#min').val();
	const max = $('#max').val();

	if (parseInt(min) > parseInt(max)) {
		return alert('Minimum number cannot be larger than maximum');
	}

	$('#results-numbers').show();
	$('#results-numbers-guess').text('');
	$('#try-again').hide();
	scoreReset();

	// Send request using GET method with params in query string
	fetch(`/numbers/guess?min=${min}&max=${max}`, { method: 'GET' })
		.then(res => {
			if (!res.ok) throw new Error(res.statusText);
			return res.json();
		})
		.then(result => {
			// Create some artificial suspense; add one dot each second
			// until 3 seconds have passed
			let wait = 0;
			let interval = setInterval(() => {
				if (wait < 3) {
					$('#results-numbers-guess').text($('#results-numbers-guess').text() + '. ');
				} else {
					$('#results-numbers-guess').text(result.guess);
					scoreShow(result.id);
					$('#try-again').show();
					clearInterval(interval);
				}
				wait++;
			}, 1000);
		})
		.catch(err => {
			console.error(err);
			$('#error').html('Error');
			$('#error').show();
		});
};
