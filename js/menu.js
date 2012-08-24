(function() {

	"use strict";

	app.Menu = function() {

		var entitySelected;
		var game;
		var divMenu;
		var menuItems;

		function Menu(game) {
		    this.entitySelected = "";
		    this.game = game;
		    this.menuItems = [];
			// construct view
			this.divMenu = document.createElement("div");
	        this.divMenu.style.display = 'inline-block';
	        this.divMenu.style.verticalAlign = 'top';
	        this.divMenu.style.width = '17%';

	        this.divMenu.appendChild(
	            this.createToggleButton(
	                "Start", 
	                function() {
	                    if(game.isRun) {
	                        this.innerHTML = "Restart";
	                        game.pause();
	                        new app.editor.Serialization(game.currentMap);
	                    } else {
	                        this.innerHTML = "Pause";
	                        game.start();
	                        new app.editor.Serialization(game.currentMap);
                        }
                    }
                ));
            this.divMenu.appendChild(
	            this.createToggleButton(
	                "Show none entities", 
	                function() {
	                    game.currentMap.showNoneEntities = !game.currentMap.showNoneEntities;
	                    if(!game.currentMap.showNoneEntities) {
	                        game.currentMap.noneEntities = [];
	                    }
                    }
                ));
            this.createSliderTime(game);
            this.load(game.currentMap);
		};
		
		Menu.prototype.load = function(map) {
		    // add buttons related to map
		    var that = this;
		    for(var entityIndex in map.menuEntities) {
		        var entity = map.menuEntities[entityIndex];
		        var menuItem = new app.MenuItem(this, entity, entity.nb, this.clickItemMenu);
		        this.menuItems.push(menuItem);
            }
            document.body.appendChild(this.divMenu);
		}
		
		Menu.prototype.clickItemMenu = function(menuItem) {
            for(var itemIndex in this.menuItems) {
                var item = this.menuItems[itemIndex];
                if(item != menuItem) {
                    item.unselect();
                }
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
        
        Menu.prototype.createSliderTime = function(game) {
            var divSlider = document.createElement("div");
            divSlider.style.color = 'white';
            divSlider.style.border = '1px solid white';
            divSlider.style.display = 'block';
            divSlider.style.width = '80%';
            divSlider.style.height = '50px';
            divSlider.style.margin = 'auto';
            var sliderTime = document.createElement("input");
            sliderTime.type = "range";
            sliderTime.min = 10;
            sliderTime.max = 850;
            sliderTime.value = 50;
            sliderTime.step = 10;
            sliderTime.style.display = 'block';
            sliderTime.style.width = '80%';
            sliderTime.style.margin = 'auto';
            sliderTime.onchange = function() {
                game.timeLoop = sliderTime.value;
                game.pause();
                game.start();
            };
            divSlider.appendChild(sliderTime);
            this.divMenu.appendChild(divSlider);
        }

		return Menu;

	}();
})();

