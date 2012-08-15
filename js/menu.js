(function() {

	"use strict";

	app.Menu = function() {

		var entitySelected;
		var game;
		var divMenu;

		function Menu(game) {
		    this.entitySelected = "";
		    this.game = game;
			// construct view
			this.divMenu = document.createElement("div");
	        this.divMenu.style.display = 'inline-block';
	        this.divMenu.style.verticalAlign = 'top';
	        this.divMenu.style.width = '18%';

	        this.divMenu.appendChild(
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
            this.load(game.currentMap);
		};
		
		Menu.prototype.load = function(map) {
		    // add buttons related to map
		    var that = this;
		    for(var entityIndex in map.menuEntities) {
		        var entity = map.menuEntities[entityIndex];
		        var menuItem = new app.MenuItem(this, entity, entity.nb, this.clickItemMenu);
            }
            document.body.appendChild(this.divMenu);
		}
		
		Menu.prototype.clickItemMenu = function() {
            if(this.entitySelected == "aimant") {
                this.entitySelected = "";
            } else {
                this.entitySelected = "aimant";
            }
            console.log("clickAimant " + this.entitySelected);
            console.log(this);
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

