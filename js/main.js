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
	canvas.style.border = '1px solid white';
	document.body.appendChild(canvas);
	
	new app.Menu(game);
	
	game.init();
	
	var divPlay = document.createElement("div");
	divPlay.style.position = 'absolute';
	divPlay.style.border = '1px solid white';
	divPlay.style.width = '98%';
	divPlay.style.height = '98%';
	divPlay.style.top = '5px';
	divPlay.style.left = '5px';
	divPlay.style.backgroundColor = 'white';
	var subDivPlay = document.createElement("div");
	subDivPlay.style.width = '0';
	subDivPlay.style.height = '0';
	subDivPlay.style.borderTop = '80px solid transparent';
	subDivPlay.style.borderBottom = '80px solid transparent';
	subDivPlay.style.borderLeft = '80px solid red';
	subDivPlay.style.position = 'absolute';
	subDivPlay.style.top = '30%';
	subDivPlay.style.left = '50%';
	divPlay.appendChild(subDivPlay);
	document.body.appendChild(divPlay);
	divPlay.onclick = function() {
	    this.style.display = 'none';
	}
	
    window.onresize = function(event) {
        var width = window.innerWidth;
	    var height = window.innerHeight;
	    canvas.width = parseInt(width * 0.8);
	    canvas.height = height - 21;
	    game.currentMap.draw(canvas.getContext('2d'), false);
    }
    
})();
