let scored = false;
let currentId;

const scoreReset = () => {
	scored = false;
	$('#score').hide();
	$('#score-results').html('');
	$('.score-vote').removeClass('fa-solid');
	$('.score-vote').addClass('fa-regular');
}

const scoreShow = id => {
	currentId = id;
	$('#score').show();
}

const score = (element, category, correct) => {
	if (scored) return; // Only one vote per guess
	$(element).removeClass('fa-regular');
	$(element).addClass('fa-solid');
	fetch(`/score`, {
		method: 'POST',
		body: JSON.stringify({ category, correct, id: currentId }),
		headers: { 'Content-Type': 'application/json' }
	})
	.then(res => {
		if (!res.ok) throw new Error(res.statusText);
		return res.json();
	})
	.then(result => {
		scored = true;
		$('#score-results').html(`The Mindreader's current accuracy rate is 
			${(100 * (result.correct / result.votes)).toFixed(2)}% 
			(${result.correct}/${result.votes} scores)`);
		$('#score-results').show();
	})
	.catch(err => {
		console.error(err);
		$('#error').html('Error');
		$('#error').show();
	});
};
