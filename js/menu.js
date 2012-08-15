(function() {

	"use strict";

	app.Menu = function() {

		var entitySelected;
		var game;

		function Menu(game) {
		    this.entitySelected = "";
		    this.game = game;
			// construct view
			var menu = document.createElement("div");
	        menu.style.display = 'inline-block';
	        menu.style.verticalAlign = 'top';
	        menu.style.width = '18%';

	        menu.appendChild(
	            this.createToggleButton(
	                "Start", 
	                function() {
	                    if(game.isRun) {
	                        this.innerHTML = "Restart";
	                        game.end();
	                    } else {
	                        this.innerHTML = "Pause";
	                        game.start();
                        }
                    }
                ));
            var that = this;
            menu.appendChild(
                this.createToggleButton(
                    "Aimants (3)", 
                    function() {app.Menu.prototype.clickAimant.call(that);}
                ));
            document.body.appendChild(menu);
            
            canvas.addEventListener("mousedown", 
                function(event) {app.Menu.prototype.mouseClickOnCanvas.call(that, event);}, false);
		};
		
		Menu.prototype.clickAimant = function() {
            if(this.entitySelected == "aimant") {
                this.entitySelected = "";
            } else {
                this.entitySelected = "aimant";
            }
            console.log("clickAimant " + this.entitySelected);
            console.log(this);
        }
		
		Menu.prototype.load = function(map) {
		    // add buttons related to map
		}
		
		Menu.prototype.mouseClickOnCanvas = function(event) {
		    console.log("mouseclick " + this.entitySelected);
		    console.log(this);
            if(this.entitySelected == "aimant") {
                var canvas = this.game.canvas;
                var x= event.clientX-document.documentElement.scrollLeft-canvas.offsetLeft;
                var y= event.clientY-document.documentElement.scrollTop-canvas.offsetTop;
                var subblob = new app.entities.Source();
		        subblob.shape = new app.shapes.Rectangle();
		        subblob.shape.width = 50;
		        subblob.shape.height = 50;
		        subblob.shape.x = x;
		        subblob.shape.y = y;
		        subblob.init();
		        this.game.currentMap.staticEntities.push(subblob);
            }
        }
		
		Menu.prototype.createToggleButton = function(name, callback) {
            var btn = document.createElement("div");
            btn.id = 'btn'+name;
            btn.style.color = 'white';
            btn.style.border = '1px solid white';
            btn.innerHTML = name;
            btn.onclick = callback;
            btn.style.display = 'block';
            btn.style.width = '80%';
            btn.style.height = '50px';
            btn.style.margin = 'auto';
            return btn;
        }

		return Menu;

	}();
})();

