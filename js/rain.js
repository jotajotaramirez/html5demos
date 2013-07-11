/*
	Author: Juan José Ramírez Escribano @jotajotaramirez
	Date: 10 July 2013
*/

$(function() {
	var canvas = $('canvas');
	var context = canvas.get(0).getContext('2d');
	var NUM_DROPS = canvas.width();
	var wind = 0;

	var Drop = function(x, y, speedX, maxFall) {
		this.x = x;
		this.y = y;
		this.speedX = speedX;
		this.maxFall = maxFall;
		this.dropRadius = 0;
		this.step = 0;
		this.windAcceleration = 0;
	}

	Drop.prototype = {
		'update': function(container) {
			if (this.y < this.maxFall) {
				this.speedY = 9.8 / 3000 * this.step;
				this.height = this.speedY * 2;
				this.x = (this.x + this.speedX + this.windAcceleration) % 100;
				if (this.x < 0) {
					this.x = 100 - this.x;
				}
				this.step++;
				this.y += this.speedY;
				this.windAcceleration += (wind / Math.max(this.windAcceleration, 0.1)) / 10000; // this can be improved
 			}
			
			if (this.y + this.height >= this.maxFall) {
				this.dropRadius += this.speedY / 10;

				if (this.dropRadius > 2) { // reset
					this.y = randomRange(-500, 0);
					this.dropRadius = 0;
					this.step = 0;
				}
			}
		},
		'paint': function(canvas, context, width, height) {
			context.beginPath();

			var xFromPos = this.x * width / 100,
				xToPos = (this.x + this.speedX + this.windAcceleration) * width / 100,
				yFromPos = this.y * height / 100,
				yToPos = Math.min(this.y + this.height, this.maxFall) * height / 100;

			if (this.y < this.maxFall) {
				context.strokeStyle = 'rgba(255, 255, 255, 1.0)';
				context.moveTo(xFromPos, yFromPos);
				context.lineTo(xToPos, yToPos);
				context.closePath();
				context.stroke();
			}

			if (this.y + this.height >= this.maxFall) {
				context.strokeStyle = 'rgba(255, 255, 255, ' + (1 - (this.dropRadius / 2)) + ')';
				context.save();
				context.scale(1, 0.2);
				context.beginPath();
				context.arc(xToPos, yToPos * 5, Math.pow(this.maxFall / 100, 8) * this.dropRadius * width / 100, 0, 2 * Math.PI);
				context.closePath();
				context.restore();
				context.stroke();
			}
		}
	}

	var drops = [];

	for (var i = 0; i < NUM_DROPS; i++) {
		var drop = new Drop(randomNumber(100), randomRange(-500, 0), 0, randomRange(80, 100));
		drops.push(drop);
	}

	var drawRain = function() {
		var width = canvas.width();
		var height = canvas.height();
		
		context.fillStyle = 'rgba(0, 0, 0, 0.2)'; // alpha for a blur effect
		context.fillRect(0, 0, width, height);
		
		for (var i = 0; i < drops.length; i++) {
			var drop = drops[i];
			drop.update(canvas);
			drop.paint(canvas, context, width, height);
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

	var changeWind = function() {
		wind = randomRangeFloat(-0.3, 0.3);
		setTimeout(changeWind, randomRange(1000, 10000));
	};

	setTimeout(changeWind, 3000);
});