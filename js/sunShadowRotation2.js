/*
	Author: Juan José Ramírez Escribano @jotajotaramirez
	Date: 08 July 2013
*/

$(function() {
	var NUM_CELLS = 5;
	var ANIMATION_DURATION_MULTIPLIER = 20;

	var Cell = function(orbitRadius, backgroundColor) {
		this.orbitRadius = orbitRadius;
		this.backgroundColor = backgroundColor;
	}

	Cell.prototype = {
		'render': function(parent) {
			if (this.DOMelement === undefined) {
				this.DOMelement = $(document.createElement('div'))
					.addClass('cellWrapper')
					.css('padding', '0 ' + (this.orbitRadius / 2) + "%");
				parent.append(this.DOMelement);

				this.DOMelement.append($(document.createElement('div'))
					.addClass('cell')
					.css('background-color', this.backgroundColor)
					.css('animation-duration', ((1 - (this.orbitRadius / 100)) * ANIMATION_DURATION_MULTIPLIER) + 's'));
			}
		}
	}

	var cells = [];
	var main = $('.mainWrapper');
	for (var i = 0; i < NUM_CELLS; i++) {
		var cell = new Cell((i / NUM_CELLS * 100) + 10, 'rgba(' + randomRange(200, 255) + ', 0, 0, 1.0)');
		cell.render(main);
		cells.push(cell);
	}
});