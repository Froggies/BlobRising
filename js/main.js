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
	canvas.width = parseInt(width * 0.7);
	canvas.height = height - 21;
	document.body.appendChild(canvas);
	
	var menu = document.createElement("div");
	menu.style.display = 'inline-block';
	menu.style.verticalAlign = 'top';
	menu.style.width = '25%';

	game = new app.Game(maps, canvas);

	menu.appendChild(createToggleButton("Start", function() {
	    if(game.isRun) {
	        this.innerHTML = "Restart";
	        game.end();
	    } else {
	        this.innerHTML = "Pause";
	        game.start();
        }
    }));
    menu.appendChild(createToggleButton("Aimants (3)", function() {
	    if(machineSelected == "aimant") {
	        machineSelected = "";
	    } else {
	        machineSelected = "aimant";
	        
        }
    }));
    document.body.appendChild(menu);
    
    function mouseClickOnCanvas(event) {
        if(machineSelected == "aimant") {
            var x= event.clientX-document.documentElement.scrollLeft-canvas.offsetLeft;
            var y= event.clientY-document.documentElement.scrollTop-canvas.offsetTop;
            var ctx = canvas.getContext('2d');
	        var rect = new app.shapes.Rectangle();
	        rect.x = x;
	        rect.y = y;
	        rect.width = 10;
	        rect.height = 10;
	        rect.fill = false;
	        rect.draw(ctx);
        }
    }
    canvas.addEventListener("mousedown", mouseClickOnCanvas, false);
    
    window.onresize = function(event) {
        var width = window.innerWidth;
	    var height = window.innerHeight;
	    canvas.width = parseInt(width * 0.7);
	    canvas.height = height - 21;
	    game.currentMap.shape.width = canvas.width;
	    game.currentMap.shape.height = canvas.height;
	    game.currentMap.draw(canvas.getContext('2d'));
    }
    
    function createToggleButton(name, callback) {
        var btn = document.createElement("div");
        btn.id = 'btn'+name;
        btn.style.color = 'white';
        btn.style.border = '1px solid white';
        btn.innerHTML = name;
        btn.onclick = callback;
        return btn;
    }

})();
