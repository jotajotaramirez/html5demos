/*
	Author: Juan José Ramírez Escribano @jotajotaramirez
	Date: 07 July 2013
*/

var randomNumber = function(max) {
	return Math.floor(Math.random() * max);
}

var randomRange = function(min, max) {
	if (max < min) {
		var temp = max;
		max = min;
		min = temp;
	}

	return Math.floor((Math.random() * (max - min)) + min);
}

var randomColor = function() {
	return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}