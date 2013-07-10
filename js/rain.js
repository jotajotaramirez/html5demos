/*
	Author: Juan José Ramírez Escribano @jotajotaramirez
	Date: 10 July 2013
*/

$(function() {
	var canvas = $('canvas');
	var context = canvas.get(0).getContext('2d');
	var NUM_DROPS = 100;

	var Drop = function(x, y, speedX, speedY) {
		this.x = x;
		this.y = y;
		this.speedX = speedX;
		this.speedY = speedY;
		this.height = speedY * 2;
	}

	Drop.prototype = {
		'update': function(container) {
			this.x = (this.x + this.speedX) % 100;
			this.y = (this.y + this.speedY) % 100;
		},
		'paint': function(canvas) {
			var context = canvas.get(0).getContext('2d');
			context.beginPath();
			context.moveTo((this.x / 100) * canvas.width(), (this.y / 100) * canvas.height());
			context.lineTo((this.x / 100) * canvas.width(), (this.y + this.height) * canvas.height() / 100);
			context.closePath();
			context.stroke();
		}
	}

	var drops = [];

	for (var i = 0; i < NUM_DROPS; i++) {
		var drop = new Drop(randomNumber(100), 0, randomRangeFloat(0, 0.02), randomRangeFloat(0.2, 1.0));
		drops.push(drop);
	}

	var drawRain = function() {
		var width = canvas.width();
		var height = canvas.height();
		
		context.fillStyle = 'rgba(0, 0, 0, 0.1)';
		context.fillRect(0, 0, width, height);
		context.strokeStyle = '#fff';
		for (var i = 0; i < drops.length; i++) {
			var drop = drops[i];
			drop.update(canvas);
			drop.paint(canvas);
		}
	}

	var windowResized = function() {
		context.canvas.width = canvas.width();
		context.canvas.height = canvas.height();
	};

	windowResized();

	$(window).on('resize', windowResized);

	function drawLoop() {
		drawRain();
		window.crossBrowserRequestAnimationFrame(drawLoop);
	}

	drawLoop(0);
});