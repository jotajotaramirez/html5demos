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

	var inMemoryCanvasArray = [],
		CANVAS_ARRAY_LENGTH = 40; // The higher, the more randomness for drawUsingTiles3 function and more memory usage

	/* Render drawing pixel per pixel */
	var drawPixelPerPixel = function() {
		var width = context.canvas.width = canvas.width(); // clearRect not needed when reset the width or height
		var height = context.canvas.height = canvas.height();
		
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
		var width = context.canvas.width = canvas.width(); // clearRect not needed when reset the width or height
		var height = context.canvas.height = canvas.height();

		inMemoryCanvasContext.clearRect(0, 0, TILE_WIDTH, TILE_HEIGHT);
		for (var x = 0; x < TILE_WIDTH; x += STEP) {
			for (var y = 0; y < TILE_HEIGHT; y += STEP) {
				if (Math.random() > 0.5) {
					inMemoryCanvasContext.fillRect(x, y, STEP, STEP);
				}
			}
		}

		var pattern = context.createPattern(inMemoryCanvas,"repeat");
		context.rect(0, 0, width, height);
		context.fillStyle = pattern;
		context.fill();
	}

	/* Draw a tile using a ImageData object. Here STEP parameter is not used */
	var drawUsingTiles2 = function() {
		var width = context.canvas.width = canvas.width(); // clearRect not needed when reset the width or height
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

		for (var x = 0; x < width; x += TILE_WIDTH) {
			for (var y = 0; y < height; y += TILE_HEIGHT) {
				context.putImageData(tile, x, y);
			}
		}
	}

	/* Draw a tile using a set of temporal canvas */
	var drawUsingTiles3 = function() {
		var width = context.canvas.width = canvas.width(); // clearRect not needed when reset the width or height
		var height = context.canvas.height = canvas.height();

		if (inMemoryCanvasArray.length != CANVAS_ARRAY_LENGTH) {
			alert("I'm going to create aux canvas array. This may take up to 1 minute, please wait");
			for (var i = 0; i < CANVAS_ARRAY_LENGTH; i++) {
				var canvasDOM = document.createElement('canvas'),
					canvasDOMContext = canvasDOM.getContext('2d');
					canvasDOM.width = TILE_WIDTH;
					canvasDOM.height = TILE_HEIGHT;
				for (var x = 0; x < TILE_WIDTH; x += STEP) {
					for (var y = 0; y < TILE_HEIGHT; y += STEP) {
						if (Math.random() > 0.5) {
							canvasDOMContext.fillRect(x, y, STEP, STEP);
						}
					}
				}
				inMemoryCanvasArray.push(canvasDOM);
			}
		}

		for (var x = 0; x < width; x += TILE_WIDTH) {
			for (var y = 0; y < height; y += TILE_HEIGHT) {
				context.drawImage(inMemoryCanvasArray[randomRange(0, CANVAS_ARRAY_LENGTH - 1)], x, y);
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
	else if (renderType == 3) {
		drawFunction = drawUsingTiles2;
	}
	else {
		drawFunction = drawUsingTiles3;	
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