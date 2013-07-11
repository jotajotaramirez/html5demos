/*
	Author: Juan José Ramírez Escribano @jotajotaramirez
	Date: 11 July 2013
*/

$(function() {
	var interval = setInterval(function() {
		$('.main').append($('<div></div>').addClass('cell'));
	}, 100);

	$(document).on('animationIteration webkitAnimationIteration', '.cell', function() {
		$(document).off('animationIteration webkitAnimationIteration', '.cell');
		clearInterval(interval);
	});
});