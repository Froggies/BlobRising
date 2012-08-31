(function() {

	"use strict";
	
	var canvas = document.getElementById("canvas");

	var game = new app.Game(maps, canvas);
	// TODO remove this for contest
	new app.editor.Editor(game);
	
	var width = window.innerWidth;
	var height = window.innerHeight;
	
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
	    game.currentMap.draw(canvas.getContext('2d'), false);
    }
    
})();
