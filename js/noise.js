/*
	Author: Juan José Ramírez Escribano @jotajotaramirez
	Date: 09 July 2013
*/

$(function() {
	var lastDraw = 0;
	var canvas = $('canvas');
	var context = canvas.get(0).getContext('2d');

	var STEP = 1, /* Increase STEP to make bigger pixels */
		TILE_WIDTH = 200,
		TILE_HEIGHT = 200,
		inMemoryCanvas = document.createElement('canvas'),
		inMemoryCanvasContext = inMemoryCanvas.getContext('2d');
	inMemoryCanvas.width = TILE_WIDTH;
	inMemoryCanvas.height = TILE_HEIGHT;

	window.crossBrowserRequestAnimationFrame = (function(){
	  return  window.requestAnimationFrame       ||
	          window.webkitRequestAnimationFrame ||
	          window.mozRequestAnimationFrame    ||
	          function( callback ){
	            window.setTimeout(callback, 1000 / 60);
	          };
	})();


	/* Render drawing pixel per pixel */
	var drawPixelPerPixel = function() {
		var width = context.canvas.width = canvas.width();
		var height = context.canvas.height = canvas.height();
		context.clearRect(0, 0, width, height);
		context.fillStyle = '#000';

		for (var x = 0; x < width; x += STEP) {
			for (var y = 0; y < height; y += STEP) {
				if (Math.random() > 0.5) {
					context.fillRect(x, y, STEP, STEP);
				}
			}
		}
	}

	/* Draw a tile using a temporal canvas */
	var drawUsingTiles1 = function() {
		var width = context.canvas.width = canvas.width();
		var height = context.canvas.height = canvas.height();

		inMemoryCanvasContext.clearRect(0, 0, TILE_WIDTH, TILE_HEIGHT);
		for (var x = 0; x < TILE_WIDTH; x += STEP) {
			for (var y = 0; y < TILE_HEIGHT; y += STEP) {
				if (Math.random() > 0.5) {
					inMemoryCanvasContext.fillRect(x, y, STEP, STEP);
				}
			}
		}

		context.clearRect(0, 0, width, height);

		for (var x = 0; x < width; x += TILE_WIDTH) {
			for (var y = 0; y < height; y += TILE_HEIGHT) {
				context.drawImage(inMemoryCanvas, x, y);
			}
		}
	}

	/* Draw a tile using a image */
	var drawUsingTiles2 = function() {
		var width = context.canvas.width = canvas.width();
		var height = context.canvas.height = canvas.height();

		var tile = context.createImageData(TILE_WIDTH, TILE_HEIGHT);
		var tileData = tile.data;
		for (var i = 0; i < tileData.length; i += 4) {
			if (Math.random() > 0.5) {
				tileData[i] = 0;
				tileData[i + 1] = 0;
				tileData[i + 2] = 0;
			}
			else {
				tileData[i] = 255;
				tileData[i + 1] = 255;
				tileData[i + 2] = 255;				
			}
			tileData[i + 3] = 255;
		}

		context.clearRect(0, 0, width, height);

		for (var x = 0; x < width; x += TILE_WIDTH) {
			for (var y = 0; y < height; y += TILE_HEIGHT) {
				context.putImageData(tile, x, y);
			}
		}
	}

	var drawFunction;

	var renderType = window.location.search.substr(window.location.search.length - 1, 1);
	if (renderType == 1) {
		drawFunction = drawPixelPerPixel;
	}
	else if (renderType == 2) {
		drawFunction = drawUsingTiles1;
	}
	else {
		drawFunction = drawUsingTiles2;	
	}

	function drawLoop(timeStamp) {
		/* Use this for incremental drawing based on last draw time
		var dt = timeStamp - lastDraw;
		
		if (dt >= 1000) {
			console.log(dt);
			lastDraw = timeStamp;
			draw(dt);
		}
		*/

		drawFunction();
		window.crossBrowserRequestAnimationFrame(drawLoop);
	}

	drawLoop(0);
});