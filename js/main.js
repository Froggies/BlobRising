(function() {

	"use strict";
	
	var canvas = document.createElement("canvas");

	var game = new app.Game(maps, canvas);
	var machineSelected = "";
	
	document.body.style.backgroundColor = 'black';
	
	var width = window.innerWidth;
	var height = window.innerHeight;
	
	canvas.style.display = 'inline';
	canvas.id = "canvas";
	canvas.width = parseInt(width * 0.8);
	canvas.height = height - 21;
	document.body.appendChild(canvas);
	
	new app.Menu(game);
	
	game.init();
	
    window.onresize = function(event) {
        var width = window.innerWidth;
	    var height = window.innerHeight;
	    canvas.width = parseInt(width * 0.8);
	    canvas.height = height - 21;
	    game.currentMap.shape.width = canvas.width;
	    game.currentMap.shape.height = canvas.height;
	    game.currentMap.draw(canvas.getContext('2d'), false);
    }
    
})();
