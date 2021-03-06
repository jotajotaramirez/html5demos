/*
	Author: Juan José Ramírez Escribano @jotajotaramirez
	Date: 07 July 2013
*/

var randomNumber = function(max) {
	return Math.round(Math.random() * max);
}

var randomRangeFloat = function(min, max) {
	if (max < min) {
		var temp = max;
		max = min;
		min = temp;
	}

	return (Math.random() * (max - min)) + min;
}

var randomRange = function(min, max) {
	return Math.round(randomRangeFloat(min, max));
}

var randomColor = function() {
	return "#" + Math.round(Math.random() * 0xffffff).toString(16);
}

window.crossBrowserRequestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();