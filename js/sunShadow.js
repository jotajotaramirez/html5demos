/*
	Author: Juan José Ramírez Escribano @jotajotaramirez
	Date: 07 July 2013
*/

$(function() {
	var NUM_CELLS = 10;
	var SHADOW_OFFSET_MULTIPLER = 5;

	var Cell = function(x, y, backgroundColor) {
		this.x = x;
		this.y = y;
		this.backgroundColor = backgroundColor;
	}

	Cell.prototype = {
		'render': function(parent) {
			if (this.DOMelement === undefined) {
				this.DOMelement = $(document.createElement('div')).addClass('cell').css('background-color', this.backgroundColor);
				parent.append(this.DOMelement);
			}
			var distanceFromSun = {
				x: ((this.x / 100) - 0.5),
				y: ((this.y / 100) - 0.5),
				absolute: function() {
					return Math.abs(this.x * this.y);
				}
			}

			var shadow = (((this.x / 100) - 0.5) * SHADOW_OFFSET_MULTIPLER) + 'em ' +
						(((this.y / 100) - 0.5) * SHADOW_OFFSET_MULTIPLER) + 'em ' +
						(distanceFromSun.absolute() * 20) + 'em rgba(0, 0, 0, 0.8)' +
					', inset ' +
						(0.5 - (this.x / 100)) + 'em ' +
						(0.5 - (this.y / 100)) + 'em ' +
						'1em rgba(0, 0, 0, 0.8)';

			this.DOMelement
				.css('left', this.x + "%")
				.css('top', this.y + "%")
				.css('box-shadow', shadow);
		}
	}

	var cells = [];
	var main = $('.main');
	for (var i = 0; i < NUM_CELLS; i++) {
		var cell = new Cell(0, 0, 'rgba(' + randomRange(100, 255) + ', 0, 0, 1.0)');
		cell.render(main);
		cells.push(cell);
	}

	var moveCell = function(cell) {
		cell.x = randomRange(0, 95);
		cell.y = randomRange(0, 95);
		cell.render();
		setTimeout(function() {
			moveCell(cell);
		}, randomRange(500, 2000))
	};

	cells.forEach(function(cell, index, array) {
		moveCell(cell);
	});
});