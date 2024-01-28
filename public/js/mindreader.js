// The ready() event is fired when the DOM is fully loaded
$(document).ready(function() {
	$('#submit').on('click', () => read());
	read();
});

const read = () => {
	scoreReset();
	fetch(`/predictions`)
		.then(res => {
			if (!res.ok) throw new Error(res.statusText);
			return res.json();
		})
		.then(result => {
			// Result will be a JSON object
			const items = result.predictions.items.map(item =>
				`<li>${item.prefix} <span class="bold">${item.value}<span</li>`
			);
			$('#results').html(`<ul>${items.join('\n')}</ul>`);
			$('#try-again').show();
			scoreShow(result.predictions._id);
		})
		.catch(err => {
			console.error(err);
			$('#error').html('Error');
			$('#error').show();
		});
};
