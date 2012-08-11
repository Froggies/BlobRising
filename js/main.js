(function() {

	"use strict";

	var game = new app.Game();
	var machineSelected = "";
	
	document.body.style.backgroundColor = 'black';
	
	var width = window.innerWidth;
	var height = window.innerHeight;
	
	var canvas = document.createElement("canvas");
	canvas.style.display = 'inline';
	canvas.id = "canvas";
	canvas.width = parseInt(width * 0.7);
	canvas.height = height - 21;
	var ctx = canvas.getContext('2d');
	ctx.strokeStyle = 'white';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
	document.body.appendChild(canvas);
	
	var menu = document.createElement("div");
	menu.style.display = 'inline-block';
	menu.style.verticalAlign = 'top';
	menu.style.width = '25%';
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
	        ctx.strokeStyle = 'white';
	        ctx.strokeRect(x, y, 10, 10);
        }
    }
    canvas.addEventListener("mousedown", mouseClickOnCanvas, false);
    
    window.onresize = function(event) {
        var width = window.innerWidth;
	    var height = window.innerHeight;
	    canvas.width = parseInt(width * 0.7);
	    canvas.height = height - 21;
	    var ctx = canvas.getContext('2d');
	    ctx.strokeStyle = 'white';
	    ctx.strokeRect(0, 0, canvas.width, canvas.height);
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
