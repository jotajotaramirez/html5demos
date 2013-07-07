/*
	Author: Juan José Ramírez Escribano @jotajotaramirez
	Date: 07 July 2013
*/

$(function() {
	var Cell = function(x, y, backgroundColor) {
		this.x = x;
		this.y = y;
		this.backgroundColor = backgroundColor;
	}

	Cell.prototype = {
		'render': function(parent) {
			if (this.DOMelement === undefined) {
				this.DOMelement = $(document.createElement('div')).addClass('cell');
				parent.append(this.DOMelement);
			}
			this.DOMelement.css('left', this.x + "%")
				.css('top', this.y + "%")
				.css('background-color', this.backgroundColor);
		}
	}

	var cells = [];
	var main = $('.main');
	for (var i = 0; i < 10; i++) {
		var cell = new Cell(0, 0, randomColor());
		cell.render(main);
		cells.push(cell);
	}

	var moveCell = function(cell) {
		cell.x = randomRange(0, 95);
		cell.y = randomRange(0, 95);
		cell.backgroundColor = randomColor();
		cell.render();
		setTimeout(function() {
			moveCell(cell);
		}, randomRange(500, 2000))
	};

	cells.forEach(function(cell, index, array) {
		moveCell(cell);
	});
});