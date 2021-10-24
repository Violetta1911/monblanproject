$(function () {
	$('.datepicker').datepicker({
		buttonImage: '/images/calendar.png',
		constrainInput: false,
		closeText: 'Close',
		showButtonPanel: true,
		showButtonText: 'from',
		buttonImageOnly: true,
		showOn: 'button',
	});
	$('#btn-close').datepicker('setDate', null);

	$('.list').on('click', function () {
		$('.list').toggleClass('chosed');
		$('.tile').toggleClass('chosed');
		$('.post').toggleClass('chosed');
	});

	$('.tile').on('click', function () {
		$('.tile').toggleClass('chosed');
		$('.list').toggleClass('chosed');
		$('.post').toggleClass('chosed');
	});
});
