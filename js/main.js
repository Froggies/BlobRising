(function() {

	"use strict";
	
	var canvas = document.createElement("canvas");

	var game = new app.Game(maps, canvas);
	
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
	
	var divPlay = document.createElement("div");
	divPlay.style.position = 'absolute';
	divPlay.style.border = '1px solid white';
	divPlay.style.width = '98%';
	divPlay.style.height = '98%';
	divPlay.style.top = '0.5%';
	divPlay.style.left = '0.5%';
	divPlay.style.backgroundColor = 'white';
	var subDivPlay = document.createElement("div");
	subDivPlay.style.width = '0';
	subDivPlay.style.height = '0';
	subDivPlay.style.borderTop = '80px solid transparent';
	subDivPlay.style.borderBottom = '80px solid transparent';
	subDivPlay.style.borderLeft = '80px solid red';
	subDivPlay.style.position = 'absolute';
	subDivPlay.style.top = '45%';
	subDivPlay.style.left = '45%';
	divPlay.appendChild(subDivPlay);
	document.body.appendChild(divPlay);
	
	var blobExplainDiv = document.createElement("div");
	blobExplainDiv.innerHTML = "This is a blob, for win, help it to join well !";
	blobExplainDiv.style.position = 'absolute';
	blobExplainDiv.style.top = '5%';
	blobExplainDiv.style.left = '5%';
	document.body.appendChild(blobExplainDiv);
	
	var machineryExplainDiv = document.createElement("div");
	machineryExplainDiv.innerHTML = "For that, you can use some machinery, each of them can change the trajectory of the blob !";
	machineryExplainDiv.style.width = '300px';
	machineryExplainDiv.style.position = 'absolute';
	machineryExplainDiv.style.top = '5%';
	machineryExplainDiv.style.right = '5%';
	document.body.appendChild(machineryExplainDiv);
	
	divPlay.onclick = function() {
	    this.style.display = 'none';
	    blobExplainDiv.style.display = 'none';
	    machineryExplainDiv.style.display = 'none';
	    game.init();
	}
	
    window.onresize = function(event) {
        var width = window.innerWidth;
	    var height = window.innerHeight;
	    canvas.width = parseInt(width * 0.8);
	    canvas.height = height - 21;
	    game.currentMap.draw(canvas.getContext('2d'), false);
    }
    
})();
