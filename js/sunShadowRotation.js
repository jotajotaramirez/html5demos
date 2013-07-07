/*
	Author: Juan José Ramírez Escribano @jotajotaramirez
	Date: 07 July 2013
*/

$(function() {
	var NUM_CELLS = 10;
	var SHADOW_OFFSET_MULTIPLER = 3;

	var Cell = function(orbitRadius, backgroundColor) {
		this.orbitRadius = orbitRadius;
		this.backgroundColor = backgroundColor;
	}

	Cell.prototype = {
		'render': function(parent) {
			if (this.DOMelement === undefined) {
				this.DOMelement = $(document.createElement('div'))
					.addClass('cellWrapper')
					.css('width', this.orbitRadius + "%")
					.css('left', ((100 - this.orbitRadius) / 2) + "%")
					.css('animation-duration', randomRangeFloat(1.0, 5.0) + 's');
				parent.append(this.DOMelement);

				var shadow = ((this.orbitRadius / -100) * SHADOW_OFFSET_MULTIPLER) + 'em 0em ' +
						(this.orbitRadius / 20) + 'em rgba(0, 0, 0, 0.8)' +
					', inset ' +
						(this.orbitRadius / 100) + 'em ' +
						'0em 1em rgba(0, 0, 0, 0.8)';
				console.log(shadow);

				this.DOMelement.append($(document.createElement('div'))
					.addClass('cell')
					.css('background-color', this.backgroundColor)
					.css('top', (47.5 - (this.orbitRadius * 0.05)) + "%")
					.css('box-shadow', shadow));

			}
		}
	}

	var cells = [];
	var main = $('.main');
	for (var i = 0; i < NUM_CELLS; i++) {
		var cell = new Cell(randomRange(30, 70), 'rgba(' + randomRange(100, 255) + ', 0, 0, 1.0)');
		cell.render(main);
		cells.push(cell);
	}
});