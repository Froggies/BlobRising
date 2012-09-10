(function() {

	"use strict";
	
	window.requestAnimFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function( /* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 20);
        };
    })();
	
	var canvas = document.getElementById("canvas");

	var game = new app.Game(maps, canvas);

	var width = window.innerWidth;
	var height = window.innerHeight;
	
	canvas.width = parseInt(width - 25);
	canvas.height = height - 25;
	document.body.appendChild(canvas);
	
	var menu = new app.Menu(game);
	game.menu = menu;
	
    game.init();
    
    // TODO remove this for contest
    // new app.editor.Editor(game);
	
    window.onresize = function(event) {
        var width = window.innerWidth;
	    var height = window.innerHeight;
	    canvas.width = parseInt(width - 25);
	    canvas.height = height - 25;
	    if(game.isRun) {
	        game.currentMap.draw(canvas.getContext('2d'), false);
	    }
    }
    
})();
