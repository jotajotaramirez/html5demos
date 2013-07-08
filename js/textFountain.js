/*
	Author: Juan José Ramírez Escribano @jotajotaramirez
	Date: 08 July 2013
*/

$(function() {
	var MAX_LETTERS = 52;
	var letters = [];

	var moveLetter = function(letter) {
			letter.on('transitionend webkitTransitionEnd', 
				function() {
					$(this).off('transitionend webkitTransitionEnd')
						.css('transition', 'none').css('left', '50%').css('top', '50%');
					setTimeout(moveLetter, randomRange(0, 1000), $(this));
				}).css('transition', 'all 1s');

			var finalPosition = randomNumber(4);
			switch (finalPosition) {
				case 0:
					letter.css('left', '-10%').css('top', randomRange(0, 100) + '%');
					break;
				case 1:
					letter.css('left', '100%').css('top', randomRange(0, 100) + '%');
					break;
				case 2:
					letter.css('top', '-10%').css('left', randomRange(0, 100) + '%');
					break;
				case 3:
					letter.css('top', '100%').css('left', randomRange(0, 100) + '%');
					break;
			}
		}

	for (var i = 0; i < MAX_LETTERS; i++) {
		var ASCIIBase = i < 26? 65 : (97 - 26);
		var letter = String.fromCharCode(ASCIIBase + i);
		var letterDOM = $('<div>' + letter + '</div>').addClass('letter');
		letters.push(letter);
		$('.main').append(letterDOM);
		setTimeout(moveLetter, randomRange(0, 1000), letterDOM);
	}
});